import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createInput } from './types/comment.service.type';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findAll({ lectureId }) {
    const result = await this.commentRepository.find({
      where: {
        lecture: lectureId,
      },
    });

    return result;
  }

  async create({ lectureId, commentInput, hashedPassword }: createInput) {
    const result = await this.commentRepository.save({
      ...commentInput,
      password: hashedPassword,
      lecture: { id: lectureId },
    });

    return result;
  }

  async delete({ commentId, password }) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });
    const isValidPassword = await bcrypt.compare(password, comment.password);

    if (!isValidPassword)
      throw new UnauthorizedException('잘못된 비밀번호를 입력했습니다');

    const result = await this.commentRepository.softDelete({ id: commentId });

    return { id: commentId };
  }
}

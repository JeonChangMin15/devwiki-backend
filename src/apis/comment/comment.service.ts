import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createInput } from './types/comment.service.type';
import { Lecture } from '../lecture/entities/lecture.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
  ) {}

  async findAll({ lectureId }) {
    const result = await this.commentRepository.find({
      where: {
        lecture: lectureId,
      },
    });

    return result;
  }

  async updateAverageRating(lectureId: string) {
    const lecture = await this.lectureRepository.findOne({
      where: {
        id: lectureId,
      },
      relations: ['comments'],
    });

    const comments = lecture.comments;

    const ratings = comments.map((comment) => comment.rating);

    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);

    lecture.averageRating = Number((totalRating / comments.length).toFixed(1));

    await this.lectureRepository.save(lecture);
  }

  async create({ lectureId, commentInput, hashedPassword }: createInput) {
    const result = await this.commentRepository.save({
      ...commentInput,
      password: hashedPassword,
      lecture: { id: lectureId },
    });

    await this.updateAverageRating(lectureId);

    return result;
  }

  async delete({ commentId, password, lectureId }) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });
    const isValidPassword = await bcrypt.compare(password, comment.password);

    if (!isValidPassword)
      throw new UnauthorizedException('잘못된 비밀번호를 입력했습니다');

    const result = await this.commentRepository.softDelete({ id: commentId });

    await this.updateAverageRating(lectureId);

    return { id: commentId };
  }
}

import { Injectable } from '@nestjs/common';
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

  async create({ lectureId, commentInput }: createInput) {
    const result = await this.commentRepository.save({
      ...commentInput,
      lecture: { id: lectureId },
    });

    return result;
  }
}

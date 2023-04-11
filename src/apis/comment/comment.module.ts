import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from '../lecture/entities/lecture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Lecture])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}

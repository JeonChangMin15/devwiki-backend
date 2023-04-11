import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentInput } from './dto/comment.input';
import { Comment } from './entities/comment.entity';
import { DeleteLectureResponse } from '../lecture/dto/deleteLecture.Response';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  fetchComments(@Args('lectureId') lectureId: string) {
    return this.commentService.findAll({ lectureId });
  }

  @Mutation(() => Comment)
  createComment(
    @Args('lectureId') lectureId: string,
    @Args('commentInput') commentInput: CommentInput,
  ) {
    return this.commentService.create({ lectureId, commentInput });
  }

  @Mutation(() => DeleteLectureResponse)
  deleteComment(
    @Args('commentId') commentId: string,
    @Args('password') password: string,
  ) {
    return this.commentService.delete({ commentId, password });
  }
}

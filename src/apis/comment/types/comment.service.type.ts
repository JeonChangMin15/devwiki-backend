import { CommentInput } from '../dto/comment.input';

export interface createInput {
  lectureId: string;
  hashedPassword: string;
  commentInput: CommentInput;
}

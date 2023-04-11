import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CommentInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  description: string;

  @Max(5)
  @Min(1)
  @Field(() => Int)
  rating: number;
}

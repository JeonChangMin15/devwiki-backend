import { InputType, Field, Int, ArgsType } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
@ArgsType()
export class CreateLectureInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  platform: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Min(0)
  @Field(() => Int)
  duration: number;
}

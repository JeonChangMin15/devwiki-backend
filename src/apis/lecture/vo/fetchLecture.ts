import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Lecture } from '../entities/lecture.entity';

@ObjectType()
export class LecturePagination {
  @Field(() => Int)
  count: number;

  @Field(() => [Lecture])
  lists: Lecture[];
}

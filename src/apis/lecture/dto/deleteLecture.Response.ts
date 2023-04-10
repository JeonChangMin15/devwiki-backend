import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteLectureResponse {
  @Field(() => String)
  id: string;
}

import { Query, Resolver } from '@nestjs/graphql';
import { LectureTagService } from './lectureTag.service';

@Resolver()
export class LectureTagResolver {
  constructor(private readonly lectureTagService: LectureTagService) {}

  @Query(() => String)
  fetchTag() {
    return 'hello';
  }
}

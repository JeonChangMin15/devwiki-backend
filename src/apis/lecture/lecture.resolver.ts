import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LectureService } from './lecture.service';
import { CreateLectureInput } from './dto/createLecture.input';
import { Lecture } from './entities/lecture.entity';

@Resolver()
export class LectureResolver {
  constructor(private readonly lectureService: LectureService) {}

  @Mutation(() => Lecture)
  createLecture(
    @Args('createLectureInput') createLectureInput: CreateLectureInput,
  ) {
    return this.lectureService.create({ createLectureInput });
  }

  @Query(() => [Lecture])
  fetchLectures() {
    return this.lectureService.findAll();
  }

  @Query(() => Lecture)
  fetchLecture(@Args('lectureId') lectureId: string) {
    return this.lectureService.findOne({ lectureId });
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LectureService } from './lecture.service';
import { CreateLectureInput } from './dto/createLecture.input';
import { Lecture } from './entities/lecture.entity';
import { DeleteLectureResponse } from './dto/deleteLecture.Response';

@Resolver()
export class LectureResolver {
  constructor(private readonly lectureService: LectureService) {}

  @Query(() => [Lecture])
  fetchLectures() {
    return this.lectureService.findAll();
  }

  @Query(() => Lecture)
  fetchLecture(@Args('lectureId') lectureId: string) {
    return this.lectureService.findOne({ lectureId });
  }

  @Mutation(() => Lecture)
  createLecture(
    @Args('createLectureInput') createLectureInput: CreateLectureInput,
  ) {
    return this.lectureService.create({ createLectureInput });
  }

  @Mutation(() => DeleteLectureResponse)
  deleteLecture(
    @Args('lectureId') lectureId: string,
    @Args('password') password: string,
  ) {
    return this.lectureService.delete({ lectureId, password });
  }
}

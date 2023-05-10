import * as bcrypt from 'bcrypt';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LectureService } from './lecture.service';
import { CreateLectureInput } from './dto/createLecture.input';
import { Lecture } from './entities/lecture.entity';
import { DeleteLectureResponse } from './dto/deleteLecture.Response';
import { UpdateLectureInput } from './dto/updateLecture.input';

@Resolver()
export class LectureResolver {
  constructor(private readonly lectureService: LectureService) {}

  @Query(() => String)
  mytest() {
    return 'hello';
  }

  @Query(() => [Lecture])
  fetchLectures(@Args('main') main: string, @Args('sub') sub: string) {
    return this.lectureService.findAll({ main, sub });
  }

  @Query(() => Lecture)
  fetchLecture(@Args('lectureId') lectureId: string) {
    return this.lectureService.findOne({ lectureId });
  }

  @Query(() => [Lecture])
  fetchTopThreeLectures() {
    return this.lectureService.findTopThree();
  }

  @Mutation(() => Lecture)
  async createLecture(
    @Args('createLectureInput', { type: () => CreateLectureInput })
    createLectureInput: CreateLectureInput,
  ) {
    const hashedPassword = await bcrypt.hash(createLectureInput.password, 10);
    return this.lectureService.create({
      mainCategory: createLectureInput.mainCategory,
      subCategory: createLectureInput.subCategory,
      tags: createLectureInput.tags,
      ...createLectureInput,
      password: hashedPassword,
    });
  }

  @Mutation(() => Lecture)
  updateLecture(
    @Args('lectureId') lectureId: string,
    @Args('updateLectureInput') updateLectureInput: UpdateLectureInput,
  ) {
    return this.lectureService.update({ lectureId, updateLectureInput });
  }

  @Mutation(() => DeleteLectureResponse)
  deleteLecture(
    @Args('lectureId') lectureId: string,
    @Args('password') password: string,
  ) {
    return this.lectureService.delete({ lectureId, password });
  }
}

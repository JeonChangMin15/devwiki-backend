import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureResolver } from './lecture.resolver';
import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';
import { LectureTag } from '../lectureTags/entities/lecturetag.entity';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { MainCategoryService } from '../mainCategory/mainCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, LectureTag, MainCategory])],
  providers: [LectureResolver, LectureService, MainCategoryService],
})
export class LectureModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureResolver } from './lecture.resolver';
import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';
import { LectureTag } from '../lectureTags/entities/lecturetag.entity';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { MainCategoryService } from '../mainCategory/mainCategory.service';
import { LectureTagService } from '../lectureTags/lectureTag.service';
import { SubCategoryService } from '../subCategory/subCategory.service';
import { SubCategory } from '../subCategory/entities/subCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, LectureTag, MainCategory, SubCategory]),
  ],
  providers: [
    LectureResolver,
    LectureService,
    MainCategoryService,
    LectureTagService,
    SubCategoryService,
  ],
})
export class LectureModule {}

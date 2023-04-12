import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureResolver } from './lecture.resolver';
import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';
import { LectureTag } from '../lectureTags/entities/lecturetag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, LectureTag])],
  providers: [LectureResolver, LectureService],
})
export class LectureModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureResolver } from './lecture.resolver';
import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  providers: [LectureResolver, LectureService],
})
export class LectureModule {}

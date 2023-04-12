import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureTag } from './entities/lecturetag.entity';
import { LectureTagResolver } from './lectureTag.resolver';
import { LectureTagService } from './lectureTag.service';

@Module({
  imports: [TypeOrmModule.forFeature([LectureTag])],
  providers: [LectureTagResolver, LectureTagService],
})
export class LectureTagModule {}

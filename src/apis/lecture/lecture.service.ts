import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
  ) {}

  async findAll() {
    const result = await this.lectureRepository.find();

    return result;
  }

  async findOne({ lectureId }) {
    const result = await this.lectureRepository.findOne({
      where: {
        id: lectureId,
      },
    });

    return result;
  }

  async create({ createLectureInput }) {
    return await this.lectureRepository.save({ ...createLectureInput });
  }
}

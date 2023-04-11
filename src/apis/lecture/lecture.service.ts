import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const result = await this.lectureRepository.find({
      relations: ['comments'],
    });

    return result;
  }

  async findOne({ lectureId }) {
    const result = await this.lectureRepository.findOne({
      where: {
        id: lectureId,
      },
      relations: ['comments'],
    });

    return result;
  }

  async create({ password, ...rest }) {
    return await this.lectureRepository.save({ password, ...rest });
  }

  async update({ lectureId, updateLectureInput }) {
    return await this.lectureRepository.save({
      id: lectureId,
      ...updateLectureInput,
    });
  }

  async delete({ lectureId, password }) {
    const lecture = await this.lectureRepository.findOne({
      where: {
        id: lectureId,
      },
    });
    const isValidPassword = await bcrypt.compare(password, lecture.password);

    if (!isValidPassword)
      throw new UnauthorizedException('잘못된 비밀번호를 입력했습니다');

    const result = await this.lectureRepository.softDelete({ id: lectureId });

    return { id: lectureId };
  }
}

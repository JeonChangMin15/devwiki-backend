import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { In, Repository } from 'typeorm';
import { LectureTag } from '../lectureTags/entities/lecturetag.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
    @InjectRepository(LectureTag)
    private tagRepository: Repository<LectureTag>,
  ) {}

  async findAll() {
    const result = await this.lectureRepository.find({
      relations: ['comments', 'tags'],
    });

    return result;
  }

  async findOne({ lectureId }) {
    const result = await this.lectureRepository.findOne({
      where: {
        id: lectureId,
      },
      relations: ['comments', 'tags'],
    });

    return result;
  }

  async create({ password, tags, ...rest }) {
    const existingTags = await this.tagRepository.find({
      where: {
        name: In(tags),
      },
    });

    const existingTagNames = existingTags.map((tag) => tag.name);
    const newTags = tags.filter((tag) => !existingTagNames.includes(tag));

    const createdTags = await Promise.all(
      newTags.map((tag) => this.tagRepository.save({ name: tag })),
    );

    const tagArr = [...existingTags, ...createdTags];

    return await this.lectureRepository.save({
      password,
      ...rest,
      tags: tagArr,
    });
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

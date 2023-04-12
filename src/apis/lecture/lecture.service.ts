import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Repository } from 'typeorm';
import { MainCategoryService } from '../mainCategory/mainCategory.service';
import { LectureTagService } from '../lectureTags/lectureTag.service';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
    private readonly mainCategoryService: MainCategoryService,
    private readonly tagService: LectureTagService,
  ) {}

  async findAll() {
    const result = await this.lectureRepository.find({
      relations: ['comments', 'tags', 'mainCategory'],
    });

    return result;
  }

  async findOne({ lectureId }) {
    const result = await this.lectureRepository.findOne({
      where: {
        id: lectureId,
      },
      relations: ['comments', 'tags', 'mainCategory'],
    });

    return result;
  }

  async create({ password, tags, mainCategory, ...rest }) {
    const existedMainCategory =
      await this.mainCategoryService.checkMainCategory(mainCategory);

    const tagArr = await this.tagService.findAllTags(tags);

    return await this.lectureRepository.save({
      password,
      ...rest,
      tags: tagArr,
      mainCategory: {
        id: existedMainCategory.id,
        name: existedMainCategory.name,
      },
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

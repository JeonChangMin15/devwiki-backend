import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { LectureTag } from './entities/lecturetag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LectureTagService {
  constructor(
    @InjectRepository(LectureTag)
    private tagRepository: Repository<LectureTag>,
  ) {}

  async findAllTags(tags: string[]) {
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

    const allTags = [...existingTags, ...createdTags];

    return allTags;
  }
}

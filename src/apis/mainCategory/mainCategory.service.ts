import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MainCategory } from './entities/mainCategory.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectRepository(MainCategory)
    private mainCategoryRepository: Repository<MainCategory>,
  ) {}
  async checkMainCategory(category: string) {
    return await this.mainCategoryRepository.findOne({
      where: {
        name: category,
      },
    });
  }

  async create({ mainCategory }) {
    return await this.mainCategoryRepository.save({
      name: mainCategory,
    });
  }
}

import { MainCategoryService } from './../mainCategory/mainCategory.service';
import { Injectable } from '@nestjs/common';
import { SubCategory } from './entities/subCategory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    private readonly mainCategoryService: MainCategoryService,
  ) {}

  async checkSubCategory(category: string) {
    return await this.subCategoryRepository.findOne({
      where: {
        name: category,
      },
    });
  }

  async create({ subCategory, mainCategory }) {
    const existedMainCategory =
      await this.mainCategoryService.checkMainCategory(mainCategory);

    return await this.subCategoryRepository.save({
      name: subCategory,
      mainCategory: {
        id: existedMainCategory.id,
      },
    });
  }
}

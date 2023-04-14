import { Injectable } from '@nestjs/common';
import { SubCategory } from './entities/subCategory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create({ subCategory }) {
    return await this.subCategoryRepository.save({
      name: subCategory,
    });
  }
}

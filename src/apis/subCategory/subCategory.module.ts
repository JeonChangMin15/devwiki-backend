import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { SubCategoryResolver } from './subCategory.resolver';
import { SubCategoryService } from './subCategory.service';
import { MainCategoryService } from '../mainCategory/mainCategory.service';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, MainCategory])],
  providers: [MainCategoryService, SubCategoryResolver, SubCategoryService],
})
export class SubCategoryModule {}

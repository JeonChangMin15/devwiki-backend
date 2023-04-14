import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubCategoryService } from './subCategory.service';
import { SubCategory } from './entities/subCategory.entity';

@Resolver()
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Query(() => String)
  fetchSubCategory() {
    return 'sub';
  }

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('subCategory') subCategory: string,
    @Args('mainCategory') mainCategory: string,
  ) {
    return this.subCategoryService.create({ subCategory, mainCategory });
  }
}

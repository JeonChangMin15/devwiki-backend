import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainCategoryService } from './mainCategory.service';
import { MainCategory } from './entities/mainCategory.entity';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}
  @Query(() => String)
  fetchMainCategory() {
    return 'hello';
  }

  @Mutation(() => MainCategory)
  createMainCategory(@Args('mainCategory') mainCategory: string) {
    return this.mainCategoryService.create({ mainCategory });
  }
}

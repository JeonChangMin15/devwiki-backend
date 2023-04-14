import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategory } from 'src/apis/subCategory/entities/subCategory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class MainCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.mainCategory)
  @Field(() => [SubCategory])
  subCategory: SubCategory[];
}

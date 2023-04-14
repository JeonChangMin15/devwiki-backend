import { Field, ObjectType } from '@nestjs/graphql';
import { Lecture } from 'src/apis/lecture/entities/lecture.entity';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => MainCategory, (mainCategory) => mainCategory.subCategory)
  @Field(() => MainCategory)
  mainCategory: MainCategory;

  @OneToMany(() => Lecture, (lecture) => lecture.subCategory)
  @Field(() => [Lecture])
  lecture: Lecture;
}

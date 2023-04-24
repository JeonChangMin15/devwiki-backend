import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/comment/entities/comment.entity';
import { LectureTag } from 'src/apis/lectureTags/entities/lecturetag.entity';
import { SubCategory } from 'src/apis/subCategory/entities/subCategory.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  platform: string;

  @Column({ nullable: true })
  @Field(() => String)
  url: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  duration: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: 0, type: 'float' })
  @Field(() => Float)
  averageRating: number;

  @OneToMany(() => Comment, (comment) => comment.lecture, { nullable: true })
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @ManyToMany(() => LectureTag, (lectureTag) => lectureTag.lecture, {
    nullable: true,
  })
  @JoinTable()
  @Field(() => [LectureTag], { nullable: true })
  tags?: LectureTag[];

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.lecture)
  @Field(() => SubCategory)
  subCategory: SubCategory;
}

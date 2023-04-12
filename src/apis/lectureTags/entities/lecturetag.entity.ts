import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lecture } from '../../lecture/entities/lecture.entity';

@Entity()
@ObjectType()
export class LectureTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Lecture, (lecture) => lecture.tags)
  @JoinTable()
  @Field(() => [Lecture])
  lecture: Lecture[];
}

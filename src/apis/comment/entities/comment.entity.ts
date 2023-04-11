import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Lecture } from 'src/apis/lecture/entities/lecture.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
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
  description: string;

  @Min(1)
  @Max(5)
  @Column()
  @Field(() => Int)
  rating: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.comments)
  @Field(() => Lecture)
  lecture: Lecture;
}

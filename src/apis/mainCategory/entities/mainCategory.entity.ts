import { Field, ObjectType } from '@nestjs/graphql';
import { Lecture } from 'src/apis/lecture/entities/lecture.entity';
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

  @OneToMany(() => Lecture, (lecture) => lecture.mainCategory)
  @Field(() => [Lecture])
  lecture: Lecture[];
}

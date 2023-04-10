import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
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
}

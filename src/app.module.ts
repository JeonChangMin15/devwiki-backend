import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommentModule } from './apis/comment/comment.module';
import { LectureModule } from './apis/lecture/lecture.module';
import { MainCategoryModule } from './apis/mainCategory/mainCategory.module';
import { LectureTagModule } from './apis/lectureTags/lectureTag.module';
import { SubCategoryModule } from './apis/subCategory/subCategory.module';

@Module({
  imports: [
    LectureModule,
    CommentModule,
    MainCategoryModule,
    SubCategoryModule,
    LectureTagModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'devwikiproject',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLectureInput } from './createLecture.input';

@InputType()
export class UpdateLectureInput extends PartialType(CreateLectureInput) {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  Types,
  Schema as MongooseSchema,
  PromiseProvider,
} from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  imageUrl: string;

  @Prop()
  cohort: string;

  @Prop()
  resume: string;

  @Prop({ default: new Date() })
  dateAdded: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

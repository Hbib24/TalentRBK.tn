import { Student, StudentDocument } from './student.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(data: any) {
    const student = new this.studentModel(data);
    let promise = await student.save();
    return promise;
  }

  async getAll(offset: any) {
    let students = await this.studentModel.find().skip(offset).limit(8);

    let count = await this.studentModel.countDocuments();

    return { items: students, count: count };
  }
}

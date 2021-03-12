import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Put,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@Controller('/api/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('/new')
  @UseInterceptors(FileInterceptor('resume'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { resume: string },
    @Res() res: Response,
  ) {
    var fs = require('fs');

    fs.rename(
      join(__dirname, '..', '..', file.path),
      join(__dirname, '..', '..', file.path + '.pdf'),
      (err) => console.log(err),
    );

    const { filename } = file;

    body.resume = 'upload/' + filename + '.pdf';

    this.studentService
      .create(body)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @Get('/:offset')
  getAll(@Res() res: Response, @Req() req: Request) {
    this.studentService
      .getAll(parseInt(req.params.offset))
      .then((students) => {
        res.status(200).send(students);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @Get('/pop/yes')
  populate() {
    console.log('here');
    const faker = require('faker');
    for (var i = 0; i < 15; i++) {
      let obj = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        imageUrl: faker.image.people(),
        resume: 'upload/20e7d9eff52ccdc90c035b97041103c0.pdf',
        cohort: 'cohort 7',
      };

      this.studentService.create(obj);
    }
  }
}

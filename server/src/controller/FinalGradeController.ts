import { NextFunction, Request, Response } from "express";
import { FinalGrade } from '../entity/FinalGrade';

export class FinalGradeController {

  async all(request: Request, response: Response, next: NextFunction) {
    return FinalGrade.find({ relations: ["schedule", "schedule.course", "schedule.campus", "schedule.teacher", "schedule.student"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return FinalGrade.findOne(request.params.id, { relations: ["schedule", "schedule.course", "schedule.campus", "schedule.teacher", "schedule.student"] });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return FinalGrade.save(request.body);
  }

}

import { NextFunction, Request, Response } from "express";
import { Schedule } from "../entity/Schedule";

export class StudentScheduleController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Schedule.find({ relations: ["student", "course"], where:{student:request.query.studentId} } );
	}

}
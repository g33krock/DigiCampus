import { NextFunction, Request, Response } from "express";
import { TimeCard } from "../entity/TimeCard";

export class TeacherTimeCardController {

	async all(request: Request, response: Response, next: NextFunction) {
		return TimeCard.find({ relations: ["teacher"], where:{teacher:request.query.teacherId} } );
	}


}
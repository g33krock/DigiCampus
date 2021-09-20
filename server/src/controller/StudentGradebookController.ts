import { NextFunction, Request, Response } from "express";
import { Gradebook } from "../entity/Gradebook";

export class StudentGradebookController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Gradebook.find({ relations: ["students", "courses"], where:{students:request.query.studentsId} } );
	}

}
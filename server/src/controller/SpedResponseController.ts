import { NextFunction, Request, Response } from "express";
import { SpedResponse } from "../entity/SpedResponse";

export class SpedResponseController {

	async all(request: Request, response: Response, next: NextFunction) {
		return SpedResponse.find({ relations: ["students", "teachers"], where:{students:request.query.studentsId} });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return SpedResponse.findOne(request.params.id, { relations: ["student", "teacher"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return SpedResponse.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let spedResponseToRemove = await SpedResponse.findOne(request.params.id);
		await SpedResponse.remove(spedResponseToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const spedResponse = await SpedResponse.findOne(request.params.id);
		const data = request.body;
		Object.assign(spedResponse, data);
		return spedResponse.save();
	}

}
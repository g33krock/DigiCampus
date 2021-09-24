import { NextFunction, Request, Response } from "express";
import { District } from "../entity/District";

export class DistrictController {

	async all(request: Request, response: Response, next: NextFunction) {
		return District.find({ relations: ["students"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return District.findOne(request.params.id, { relations: ["students"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return District.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let studentToRemove = await District.findOne(request.params.id);
		await District.remove(studentToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const student = await District.findOne(request.params.id);
		const data = request.body;
		Object.assign(student, data);
		return student.save();
	}

}
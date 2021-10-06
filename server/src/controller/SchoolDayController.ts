import { NextFunction, Request, Response } from "express";
import { SchoolDay } from "../entity/SchoolDay";

export class SchoolDayController {

	async all(request: Request, response: Response, next: NextFunction) {
		return SchoolDay.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return SchoolDay.findOne(request.params.id);
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return SchoolDay.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let studentToRemove = await SchoolDay.findOne(request.params.id);
		await SchoolDay.remove(studentToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const schoolDay = await SchoolDay.findOne(request.params.id);
		const data = request.body;
		Object.assign(schoolDay, data);
		return schoolDay.save();
	}

}
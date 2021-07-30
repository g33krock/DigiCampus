import { NextFunction, Request, Response } from "express";
import { Tracker } from "../entity/Tracker";

export class TrackerController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Tracker.find({ relations: ["students", "courses", "teachers", "schedules"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return Tracker.findOne(request.params.id, { relations: ["students", "courses", "teachers", "schedules"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return Tracker.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let studentToRemove = await Tracker.findOne(request.params.id);
		await Tracker.remove(studentToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const student = await Tracker.findOne(request.params.id);
		const data = request.body;
		Object.assign(student, data);
		return student.save();
	}

}
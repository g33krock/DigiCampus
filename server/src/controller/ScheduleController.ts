import { NextFunction, Request, Response } from "express";
import { Schedule } from "../entity/Schedule";

export class ScheduleController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Schedule.find({ relations: ["student", "course", "teacher", "para", "campus", "student.guardians"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return Schedule.findOne(request.params.id, { relations: ["student", "course", "teacher", "para", "campus", "student.guardians"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return Schedule.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let scheduleToRemove = await Schedule.findOne(request.params.id);
		await Schedule.remove(scheduleToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const schedule = await Schedule.findOne(request.params.id);
		const data = request.body;
		Object.assign(schedule, data);
		return schedule.save();
	}

}
import { NextFunction, Request, Response } from "express";
import { TimeCard } from "../entity/TimeCard";

export class TimeCardController {

	async all(request: Request, response: Response, next: NextFunction) {
		return TimeCard.find({ relations: ["teacher"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return TimeCard.findOne(request.params.id, { relations: ["teacher"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return TimeCard.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let timecardToRemove = await TimeCard.findOne(request.params.id);
		await TimeCard.remove(timecardToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const timecard = await TimeCard.findOne(request.params.id);
		const data = request.body;
		Object.assign(timecard, data);
		return timecard.save();
	}

}
import { NextFunction, Request, Response } from "express";
import { StaffAttendance } from "../entity/StaffAttendance";

export class StaffAttendanceController {

	async all(request: Request, response: Response, next: NextFunction) {
		return StaffAttendance.find({relations: ["teachers"]});
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return StaffAttendance.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return StaffAttendance.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const staffAttendanceToRemove = await StaffAttendance.findOne(request.params.id);
		await StaffAttendance.remove(staffAttendanceToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const staffAttendance = await StaffAttendance.findOne(request.params.id);
		const data = request.body;
		Object.assign(staffAttendance, data);
		return staffAttendance.save();
	}

}
import { NextFunction, Request, Response } from "express";
import { Attendance } from "../entity/Attendance";

export class AttendanceController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Attendance.find({ relations: ["students.id"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return Attendance.findOne(request.params.id, { relations: ["students.id"] });
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return Attendance.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const studentToRemove = await Attendance.findOne(request.params.id);
		await Attendance.remove(studentToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const student = await Attendance.findOne(request.params.id);
		const data = request.body;
		Object.assign(student, data);
		return student.save();
	}

}
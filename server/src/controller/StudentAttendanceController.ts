import { NextFunction, Request, Response } from "express";
import { StudentAttendance } from "../entity/StudentAttendance";

export class StudentAttendanceController {

	async all(request: Request, response: Response, next: NextFunction) {
		return StudentAttendance.find({ relations: ["student", "schoolday"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return StudentAttendance.findOne(request.params.id, { relations: ["student", "schoolday"] });
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return StudentAttendance.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const studentToRemove = await StudentAttendance.findOne(request.params.id);
		await StudentAttendance.remove(studentToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const student = await StudentAttendance.findOne(request.params.id);
		const data = request.body;
		Object.assign(student, data);
		return student.save();
	}

}
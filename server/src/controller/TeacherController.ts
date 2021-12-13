import { NextFunction, Request, Response } from "express";
import { Teacher } from "../entity/Teacher";

export class TeacherController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Teacher.find({ relations: ["campus", "role", "schedules", "schedules.course", "schedules.campus"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return Teacher.findOne(request.params.id, { relations: ["campus", "role", "schedules", "schedules.course", "schedules.campus"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return Teacher.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let teacherToRemove = await Teacher.findOne(request.params.id);
		await Teacher.remove(teacherToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const teacher = await Teacher.findOne(request.params.id);
		const data = request.body;
		Object.assign(teacher, data);
		return teacher.save();
	}

	async loadTeacherSchedules(request: Request, response:Response, next: NextFunction) {
		return await (await Teacher.findOne(request.params.id, { relations: ["schedules", "schedules.campus", "schedules.student", "schedules.course", "schedules.student.guardians", "schedules.teacher", "schedules.student.funding", "schedules.student.instructionmode"]})).schedules
	}

}

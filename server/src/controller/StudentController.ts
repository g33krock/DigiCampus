import { NextFunction, Request, Response } from "express";
import { Student } from "../entity/Student";

export class StudentController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Student.find({ relations: ["schedules", "campuses", "schedules.teacher", "schedules.para", "schedules.course", "guardians", "funding", "instructionmode", "schedules.campus", "district", "relatedService", "relatedService.teacher", "relatedService.relatedServiceRole"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return Student.findOne(request.params.id, { relations: ["schedules", "campuses", "schedules.teacher", "schedules.teacher.id", "schedules.course", "guardians", "funding", "instructionmode", "district", "relatedService", "relatedService.teacher", "relatedService.relatedServiceRole"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return Student.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let studentToRemove = await Student.findOne(request.params.id);
		await Student.remove(studentToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const student = await Student.findOne(request.params.id);
		const data = request.body;
		Object.assign(student, data);
		return student.save();
	}

	async loadStudentSchedules(request: Request, response:Response, next: NextFunction) {
		return await (await Student.findOne(request.params.id, { relations: ["schedules", "campuses", "schedules.teacher", "schedules.course", "guardians", "funding", "instructionmode"]})).schedules
	}


}

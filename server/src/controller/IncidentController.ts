import { NextFunction, Request, Response } from "express";
import { Incident } from "../entity/Incident";

export class IncidentController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Incident.find({ relations: ["students", "teachers"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return Incident.findOne(request.params.id, { relations: ["students", "teachers"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return Incident.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let incidentToRemove = await Incident.findOne(request.params.id);
		await Incident.remove(incidentToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const incident = await Incident.findOne(request.params.id);
		const data = request.body;
		Object.assign(incident, data);
		return incident.save();
	}

}
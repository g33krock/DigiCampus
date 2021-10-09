import { NextFunction, Request, Response } from "express";
import { SessionInfo } from "../entity/SessionInfo";

export class SessionInfoController {

	async all(request: Request, response: Response, next: NextFunction) {
		return SessionInfo.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return SessionInfo.findOne(request.params.id);
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return SessionInfo.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let sessionInfoToRemove = await SessionInfo.findOne(request.params.id);
		await SessionInfo.remove(sessionInfoToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const sessionInfo = await SessionInfo.findOne(request.params.id);
		const data = request.body;
		Object.assign(sessionInfo, data);
		return sessionInfo.save();
	}

}
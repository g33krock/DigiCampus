import { NextFunction, Request, Response } from "express";
import { RelatedServiceRole } from "../entity/RelatedServiceRole";

export class RelatedServiceRoleController {

	async all(request: Request, response: Response, next: NextFunction) {
		return RelatedServiceRole.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return RelatedServiceRole.findOne(request.params.id);
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return RelatedServiceRole.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let relatedServiceRoleToRemove = await RelatedServiceRole.findOne(request.params.id);
		await RelatedServiceRole.remove(relatedServiceRoleToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const relatedServiceRole = await RelatedServiceRole.findOne(request.params.id);
		const data = request.body;
		Object.assign(relatedServiceRole, data);
		return relatedServiceRole.save();
	}

}
import { NextFunction, Request, Response } from "express";
import { RelatedService } from "../entity/RelatedService";

export class RelatedServiceController {

	async all(request: Request, response: Response, next: NextFunction) {
		return RelatedService.find({ relations: ["student", "teacher", "relatedServiceRole"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return RelatedService.findOne(request.params.id, { relations: ["student", "teacher", "relatedServiceRole"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return RelatedService.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let relatedServiceToRemove = await RelatedService.findOne(request.params.id);
		await RelatedService.remove(relatedServiceToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const relatedService = await RelatedService.findOne(request.params.id);
		const data = request.body;
		Object.assign(relatedService, data);
		return relatedService.save();
	}

}
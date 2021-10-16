import { NextFunction, Request, Response } from "express";
import { TallyQuestion } from "../entity/TallyQuestion";

export class TallyQuestionController {

	async all(request: Request, response: Response, next: NextFunction) {
		return TallyQuestion.find({ relations: ["student"] });
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return TallyQuestion.findOne(request.params.id, { relations: ["student"] });
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return TallyQuestion.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let tallyQuestionToRemove = await TallyQuestion.findOne(request.params.id);
		await TallyQuestion.remove(tallyQuestionToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const tallyQuestion = await TallyQuestion.findOne(request.params.id);
		const data = request.body;
		Object.assign(tallyQuestion, data);
		return tallyQuestion.save();
	}

}
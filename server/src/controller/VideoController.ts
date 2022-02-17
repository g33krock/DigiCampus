import { NextFunction, Request, Response } from "express";
import { Video } from "../entity/Video";

export class VideoController {

	async all(request: Request, response: Response, next: NextFunction) {
		return Video.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return Video.findOne(request.params.id);
	}


	async save(request: Request, response: Response, next: NextFunction) {
		return Video.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let videoToRemove = await Video.findOne(request.params.id);
		await Video.remove(videoToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const video = await Video.findOne(request.params.id);
		const data = request.body;
		Object.assign(video, data);
		return video.save();
	}

}
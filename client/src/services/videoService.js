import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';


class VideoService {
    async all () {
        const response = await fetcher(`${baseURL}/videos`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (videoObject) {
        const response = await fetcher(`${baseURL}/videos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(videoObject),
        });
        return await response.json();
    };
    async delete(videoObject){
        console.log(videoObject)
        const response = fetcher(`${baseURL}/videos/`+videoObject.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(videoObject) {
        const response = fetcher(`${baseURL}/videos/`+videoObject.id, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(videoObject),
    });
        const data = response;
        console.log(data);
    }
}

export const videoService = new VideoService();
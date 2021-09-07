import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class TimeCardService {
    async all () {
        const response = await fetcher(`${baseURL}/timecards`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create(timecardObject) {
        const response = await fetcher(`${baseURL}/timecards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(timecardObject),
        });
        return await response.json();
    };
    async delete(timecardObject){
        console.log(timecardObject)
        const response = await fetcher(`${baseURL}/timecards/`+timecardObject.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(timecardObject) {
        console.log(timecardObject)
        const response = await fetcher(`${baseURL}/timecards/`+timecardObject.id, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(timecardObject),
    });
        const data = response;
        console.log(data);
    }
}

export const timecardService = new TimeCardService();
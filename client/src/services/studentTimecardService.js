import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class StudentTimeCardService {
    async all () {
        const response = await fetcher(`${baseURL}/stimecards`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create(stimecardObject) {
        const response = await fetcher(`${baseURL}/stimecards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stimecardObject),
        });
        return await response.json();
    };
    async delete(stimecardObject){
        console.log(stimecardObject)
        const response = await fetcher(`${baseURL}/stimecards/`+stimecardObject.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(stimecardObject) {
        console.log(stimecardObject)
        const response = await fetcher(`${baseURL}/stimecards/`+stimecardObject.id, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stimecardObject),
    });
        const data = response;
        console.log(data);
    }
}

export const studentTimeCardService = new StudentTimeCardService();
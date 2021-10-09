import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class SessionInfoService {
    async all () {
        const response = await fetcher(`${baseURL}/sessionInfo`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (sessionInfoObject) {
        const response = await fetcher(`${baseURL}/sessionInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sessionInfoObject),
        });
        return await response.json();
    };
    async delete(sessionInfoObject){
        console.log(sessionInfoObject)
        const response = fetcher(`${baseURL}/sessionInfo/`+sessionInfoObject.sessionInfoID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(sessionInfoObject) {
        const response = fetcher(`${baseURL}/sessionInfo/`+sessionInfoObject.sessionInfoID, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionInfoObject),
    });
        const data = response;
        console.log(data);
    }
}

export const sessionInfoService = new SessionInfoService();
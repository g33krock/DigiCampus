import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class IncidentService {
    async all () {
        const response = await fetcher(`${baseURL}/incidents`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (incidentObject) {
        const response = await fetcher(`${baseURL}/incidents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(incidentObject),
        });
        return await response.json();
    };
    async delete(incidentObject){
        console.log(incidentObject)
        const response = fetcher(`${baseURL}/incidents/`+incidentObject.incidentId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(incidentObject) {
        console.log(incidentObject)
        const response = fetcher(`${baseURL}/incidents/`+incidentObject.incidentId, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentObject),
    });
        const data = response;
        console.log(data);
    }
}

export const incidentService = new IncidentService();
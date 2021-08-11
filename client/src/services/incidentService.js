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
        try{
        const response = await fetcher(`${baseURL}/incidents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(incidentObject),
        });
        alert(`Your incident report submitted successfully.  Go tell your immediate supervisor how amazing you are.`)
        return await response.json();}
        catch (error) {
            alert(`Your incident report did not submit successfully.  Make sure you are filling everything out and try again.`)
          }
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
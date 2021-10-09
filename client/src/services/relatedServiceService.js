import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class RelatedServiceService {
    async all () {
        const response = await fetcher(`${baseURL}/relatedServices`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (relatedServiceObject) {
        const response = await fetcher(`${baseURL}/relatedServices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(relatedServiceObject),
        });
        return await response.json();
    };
    async delete(relatedServiceObject){
        console.log(relatedServiceObject)
        const response = fetcher(`${baseURL}/relatedServices/`+relatedServiceObject.relatedServiceID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(relatedServiceObject) {
        const response = fetcher(`${baseURL}/relatedServices/`+relatedServiceObject.relatedServiceID, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(relatedServiceObject),
    });
        const data = response;
        console.log(data);
    }
}

export const relatedServiceService = new RelatedServiceService();
import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class TallyResponseService {
    async all () {
        const response = await fetcher(`${baseURL}/tallyResponses`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (tallyResponseObject) {
        try{
        const response = await fetcher(`${baseURL}/tallyResponses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tallyResponseObject),
        });
        return await response.json();}
        catch (error) {
            alert(`Your IEP response did not submit successfully.  Make sure you are filling everything out and try again.  ${tallyResponseObject.question}`)
          }
    };
    async delete(tallyResponseObject){
        console.log(tallyResponseObject)
        const response = fetcher(`${baseURL}/tallyResponses/`+tallyResponseObject.tallyResponseId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(tallyResponseObject) {
        console.log(tallyResponseObject)
        const response = fetcher(`${baseURL}/tallyResponses/`+tallyResponseObject.tallyResponseId, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tallyResponseObject),
    });
        const data = response;
        console.log(data);
    }
}

export const tallyResponseService = new TallyResponseService();
import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class TallyQuestionService {
    async all () {
        const response = await fetcher(`${baseURL}/tallyQuestions`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (tallyQuestionObject) {
        const response = await fetcher(`${baseURL}/tallyQuestions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tallyQuestionObject),
        });
        return await response.json();
    };
    async delete(tallyQuestionObject){
        console.log(tallyQuestionObject)
        const response = fetcher(`${baseURL}/tallyQuestions/`+tallyQuestionObject.tallyQuestionId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return await response;
    };
    async update(tallyQuestionObject) {
        console.log(tallyQuestionObject)
        const response = await fetcher(`${baseURL}/tallyQuestions/`+tallyQuestionObject.id, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tallyQuestionObject),
    });
        const data = response;
        console.log(data);
    }
}

export const tallyQuestionService = new TallyQuestionService();
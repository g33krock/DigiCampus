import {baseURL} from "../baseURL";
import { fetcher } from "./fetcher";

class TrackerService {
    async create (trackerObject) {
      try {
        const response = await fetcher(`${baseURL}/trackers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(trackerObject),
          });
          alert(`You are a smart, capable, and beautiful individual that submits trackers successfully!  ${trackerObject.students}`)
          return await response.json();
        }
          catch (error) {
            alert(`Your tracker did not submit successfully.  If at first you don't succeed, fill out the entire tracker and try again.  ${trackerObject.students}`)
          }
    }
}

export const trackerService = new TrackerService();
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
          alert(`Your tracker submitted successfully.  You are really good at this and should be proud of yourself!  ${trackerObject.students}`)
          return await response.json();
        }
          catch (error) {
            alert(`Your tracker did not submit successfully.  Make sure you are filling everything out and try again.  ${trackerObject.students}`)
          }
    }
}

export const trackerService = new TrackerService();
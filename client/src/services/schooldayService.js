import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class SchoolDayService {
    async all () {
        const response = await fetcher(`${baseURL}/schooldays`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${JSON.parse(localStorage["supabase.auth.token"]).currentSession.access_token}`
            },
          });
          return await response.json();
    }
}

export const schooldayService = new SchoolDayService();
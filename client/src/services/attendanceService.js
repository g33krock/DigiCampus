import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class AttendanceService {
    async all () {
        const response = await fetcher(`${baseURL}/attendance`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${JSON.parse(localStorage["supabase.auth.token"]).currentSession.access_token}`
            },
          });
          return await response.json();
    }
}

export const attendanceService = new AttendanceService();
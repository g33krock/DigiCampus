import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class StudentAttendanceService {
    async all () {
        const response = await fetcher(`${baseURL}/studentattendance`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (studentAttendanceObject) {
        try {
        const response = await fetcher(`${baseURL}/studentattendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentAttendanceObject),
        });
        return await response.json();
    }
    catch (error) {
        alert(`You broke it...`)
    }
    };
    async update(studentAttendanceObject) {
        try {
            const response = fetcher(`${baseURL}/studentattendance/`+studentAttendanceObject.studentAttendanceID, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentAttendanceObject),
        });
            const data = response;
            console.log(data);
        }
        catch (error) {
            alert(`That didn't work... your attendance entry was not updated. Also, you broke the entire internet.`)
        }
    }
}

export const studentAttendanceService = new StudentAttendanceService();
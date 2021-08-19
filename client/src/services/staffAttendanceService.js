import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';


class StaffAttendanceService {
    async all () {
        const response = await fetcher(`${baseURL}/staffAttendance`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (staffAttendanceObject) {
        const response = await fetcher(`${baseURL}/staffAttendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(staffAttendanceObject),
        });
        return await response.json();
    };
    async delete(staffAttendanceObject){
        console.log(staffAttendanceObject)
        const response = fetcher(`${baseURL}/staffAttendance/`+staffAttendanceObject.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(staffAttendanceObject) {
        const response = fetcher(`${baseURL}/staffAttendance/`+staffAttendanceObject.id, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(staffAttendanceObject),
    });
        const data = response;
        console.log(data);
    }
}

export const staffAttendanceService = new StaffAttendanceService();
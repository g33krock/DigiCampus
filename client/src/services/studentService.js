import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';

class StudentService {
    async all () {
        const response = await fetcher(`${baseURL}/students`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (studentObject) {
        try {
        const response = await fetcher(`${baseURL}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentObject),
        });
        return await response.json();
    }
    catch (error) {
        alert(`Your "Add Student" did not submit successfully.  Make sure the IEP, Campus, Funding, Instruction Mode, and Start Date Questions are filled out.`)
    }
    };
    async delete(studentObject){
        console.log(studentObject)
        const response = fetcher(`${baseURL}/students/`+studentObject.studentID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(studentObject) {
        try {
            const response = fetcher(`${baseURL}/students/`+studentObject.studentID, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentObject),
        });
            const data = response;
            console.log(data);
        }
        catch (error) {
            alert(`Your "Update Student" did not submit successfully.  Make sure the Additional Services Minutes are all filled out (It is ok to put 0).`)
        }
    }
}

export const studentService = new StudentService();
import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';


class CourseService {
    async all () {
        const response = await fetcher(`${baseURL}/courses`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (courseObject) {
        const response = await fetcher(`${baseURL}/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseObject),
        });
        return await response.json();
    };
    async delete(courseObject){
        console.log(courseObject)
        const response = fetcher(`${baseURL}/courses/`+courseObject.courseID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(courseObject) {
        const response = fetcher(`${baseURL}/courses/`+courseObject.courseID, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(courseObject),
    });
        const data = response;
        console.log(data);
    }
}

export const courseService = new CourseService();
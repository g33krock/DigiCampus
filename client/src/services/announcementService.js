import {baseURL} from "../baseURL";
import { fetcher } from './fetcher';


class AnnouncementService {
    async all () {
        const response = await fetcher(`${baseURL}/announcements`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return await response.json();
    };
    async create (announcementObject) {
        const response = await fetcher(`${baseURL}/announcements`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(announcementObject),
        });
        return await response.json();
    };
    async delete(announcementObject){
        console.log(announcementObject)
        const response = fetcher(`${baseURL}/announcements/`+announcementObject.announcementID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response;
    };
    async update(announcementObject) {
        const response = fetcher(`${baseURL}/announcements/`+announcementObject.announcementID, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(announcementObject),
    });
        const data = response;
        console.log(data);
    }
}

export const announcementService = new AnnouncementService();
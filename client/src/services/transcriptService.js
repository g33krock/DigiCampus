import { baseURL } from "../baseURL";
import { fetcher } from "./fetcher";

class TranscriptService {
  async all() {
    const response = await fetcher(`${baseURL}/transcripts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
  async create(transcriptObject) {
    try {
      const response = await fetcher(`${baseURL}/transcripts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transcriptObject),
      });
      return await response.json();
    } catch (error) {
      alert(
        `Uh oh... you broke the internet.`
      );
    }
  }
  async delete(transcriptObject) {
    console.log(transcriptObject);
    fetcher(
      `${baseURL}/transcripts/` + transcriptObject.transcriptId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return;
  }
  async update(transcriptObject) {
    console.log(transcriptObject);
    const response = fetcher(`${baseURL}/transcripts/` + transcriptObject.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transcriptObject),
    });
    const data = response;
    console.log(data);
  }
}

export const transcriptService = new TranscriptService();

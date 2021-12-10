import { baseURL } from '../baseURL';
import { fetcher } from './fetcher';

class FinalGradeService {
  async all () {
    const response = await fetcher(`${baseURL}/finalGrade`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async one () {
    const response = await fetcher(`${baseURL}/finalGrade/:id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async create (finalGradeObject) {
    const response = await fetcher(`${baseURL}/finalGrade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalGradeObject),
    });
    return await response.json();
  }
}

export const finalGradeService = new FinalGradeService();

import { finalGradeService } from '../services/finalGradeService';

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// ACTION TYPES
const CREATE_GRADE = 'CREATE_GRADE';

// ACTION CREATORS
const _createGrade = (grade) => ({ type: CREATE_GRADE, grade });

// THUNK CREATORS
export const createGrades = (grade) => {
  return async (dispatch) => {
    try {
      const docRef = await addDoc(collection(db, "entries"), {
        ...grade
      });
      console.log("DOCREF: ", docRef);

      dispatch(_createGrade(docRef));
    } catch (error) {
      console.error("error in createGrades thunk!", error);
    }
  }
};

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case CREATE_GRADE:
      return [...state, action.grade];
    default:
      return state;
  }
}

import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// ACTION TYPES
const SET_GRADES = 'SET_GRADES';


// ACTION CREATORS
const setGrades = (grades) => ({ type: SET_GRADES, grades });

// THUNK CREATORS
export const fetchGrades = (campus) => {
  return async (dispatch) => {
    try {
      let q = null;
      const entriesRef = collection(db, 'entries');

      if (campus) {
        q = query(entriesRef, where("campus", "==", campus));
      } else {
        q = query(entriesRef);
      }

      const grades = await getDocs(q);

      const data = grades.docs.map(doc => doc.data());

      dispatch(setGrades(data));
    } catch (error) {
      console.error("error in fetchGrades thunk: ", error);
    }
  }
}

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_GRADES:
      return action.grades;
    default:
      return state;
  }
}

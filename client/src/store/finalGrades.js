import { db } from './firebase';
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// ACTION TYPES
const SET_GRADES = 'SET_GRADES';
const CREATE_GRADE = 'CREATE_GRADE';
const UPDATE_GRADE = 'UPDATE_GRADE';
const DELETE_GRADE = 'DELETE_GRADE';

// ACTION CREATORS
const setGrades = (grades) => ({ type: SET_GRADES, grades });
const _createGrade = (grade) => ({ type: CREATE_GRADE, grade });
const _updateGrade = (grade) => ({ type: UPDATE_GRADE, grade });
const _deleteGrade = (grade) => ({ type: DELETE_GRADE, grade });

// THUNK CREATORS
export const fetchGrades = (campus) => {
  return async (dispatch) => {
    try {
      let q = null;
      const entriesRef = collection(db, 'entries-march');

      if (campus) {
        q = query(entriesRef, where('campus', '==', campus));
      } else {
        q = query(entriesRef);
      }

      const grades = await getDocs(q);

      const data = grades.docs.map((doc) => doc.data());

      dispatch(setGrades(data));
    } catch (error) {
      console.error('error in fetchGrades thunk: ', error);
    }
  };
};

export const createGrades = (grade) => {
  return async (dispatch) => {
    try {
      const docRef = await addDoc(collection(db, 'entries-march'), {
        ...grade,
      });
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      console.log('DOC: ', data);

      dispatch(_createGrade(docSnap.data()));
    } catch (error) {
      console.error('error in createGrades thunk!', error);
    }
  };
};

export const updateGrade = (grade) => {
  return async (dispatch) => {
    try {
      const entriesRef = collection(db, 'entries-march');
      const q = query(
        entriesRef,
        where('student.firstName', '==', grade.student.firstName),
        where('student.lastName', '==', grade.student.lastName),
        where('course.name', '==', grade.course.name),
        where('course.period', '==', grade.course.period)
      );

      const entries = await getDocs(q);
      const id = entries.docs[0].id;

      const docRef = doc(db, 'entries-march', id);

      await updateDoc(docRef, {
        grade: grade.grade,
      });

      dispatch(_updateGrade(grade));
    } catch (error) {
      console.error('error in updateGrade thunk!', error);
    }
  };
};

export const deleteGrade = (grade) => {
  return async (dispatch) => {
    try {
      const entriesRef = collection(db, 'entries-march');
      const q = query(
        entriesRef,
        where('student.firstName', '==', grade.student.firstName),
        where('student.lastName', '==', grade.student.lastName),
        where('course.name', '==', grade.course.name),
        where('course.period', '==', grade.course.period),
        where('grade', '==', grade.grade)
      );

      const entries = await getDocs(q);
      const id = entries.docs[0].id;


      await deleteDoc(db, 'entries-march', id);

      dispatch(_deleteGrade(grade));
    } catch (error) {
      console.error('error in updateGrade thunk!', error);
    }
  };
};

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_GRADES:
      return action.grades;
    case CREATE_GRADE:
      return [...state, action.grade];
    case UPDATE_GRADE:
      return state.map(grade => {
        if (JSON.stringify(grade) === JSON.stringify(action.grade)) {
          return action.grade;
        } else {
          return grade;
        }
      });
    case DELETE_GRADE:
      return state.filter(grade => {
        return (JSON.stringify(grade) !== JSON.stringify(action.grade));
      });
    default:
      return state;
  }
}

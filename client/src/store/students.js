import { studentService } from '../services/studentService';

// ACTION TYPES
const SET_STUDENTS = 'SET_STUDENTS';

// ACTION CREATORS
const setStudents = (students) => ({ type: SET_STUDENTS, students });

// THUNK CREATORS
export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const students = await studentService.all();

      dispatch(setStudents(students));
    } catch {
      console.error("errror in fetchStudents thunk!");
    }
  }
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    default:
      return state;
  }
}

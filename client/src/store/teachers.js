import { teacherService } from '../services/teacherService';

// ACTION TYPES
const SET_TEACHERS = 'SET_TEACHERS';

// ACTION CREATORS
const setTeachers = (teachers) => ({ type: SET_TEACHERS, teachers });

// THUNK CREATORS
export const fetchTeachers = () => {
  return async (dispatch) => {
    try {
      const teachers = await teacherService.all();

      dispatch(setTeachers(teachers));
    } catch {
      console.error("errror in fetchTeachers thunk!");
    }
  }
}

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_TEACHERS:
      return action.teachers;
    default:
      return state;
  }
}

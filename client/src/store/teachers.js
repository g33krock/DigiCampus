import { teacherService } from '../services/teacherService';

// ACTION TYPES
const SET_TEACHERS = 'SET_TEACHERS';
const CREATE_TEACHER = 'CREATE_TEACHER';

// ACTION CREATORS
const setTeachers = (teachers) => ({ type: SET_TEACHERS, teachers });
const _createTeacher = (teacher) => ({ type: CREATE_TEACHER, teacher });

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

export const createTeacher = (teacher) => {
  return async (dispatch) => {
    try {
      const newTeacher = await teacherService.create(teacher);
      dispatch(_createTeacher(newTeacher));
    } catch {
      console.error('error in createTeacher thunk!');
    }
  };
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_TEACHERS:
      return action.teachers;
    case CREATE_TEACHER:
      return [...state, action.teacher];
    default:
      return state;
  }
}

// ACTION TYPES
const SET_TEACHER = 'SET_TEACHER';

// ACTION CREATORS
export const setTeacher = (teacher) => ({ type: SET_TEACHER, teacher });

// THUNK CREATORS

// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_TEACHER:
      return action.teacher;
    default:
      return state;
  }
}

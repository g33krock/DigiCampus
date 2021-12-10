import { finalGradeService } from '../services/finalGradeService';

// ACTION TYPES
const CREATE_GRADE = 'CREATE_GRADE';

// ACTION CREATORS
const _createGrade = (grade) => ({ type: CREATE_GRADE, grade });

// THUNK CREATORS
export const createGrades = (grade) => {
  return async (dispatch) => {
    try {
      const newGrade = await finalGradeService.create(grade);

      dispatch(_createGrade(newGrade));
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

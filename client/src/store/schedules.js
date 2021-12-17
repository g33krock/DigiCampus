import { scheduleService } from '../services/scheduleService';

// ACTION TYPES
const SET_SCHEDULES = 'SET_SCHEDULES';

// ACTION CREATORS
const setSchedules = (schedules) => ({ type: SET_SCHEDULES, schedules });

// THUNK CREATORS
export const fetchSchedules = () => {
  return async (dispatch) => {
    try {
      const schedules = await scheduleService.all();

      dispatch(setSchedules(schedules));
    } catch (error) {
      console.error("error in fetchSchedules thunk: ", error);
    }
  }
}


// REDUCER
export default function reducer (state = [], action) {
  switch (action.type) {
    case SET_SCHEDULES:
      return action.schedules;
    default:
      return state;
  }
}


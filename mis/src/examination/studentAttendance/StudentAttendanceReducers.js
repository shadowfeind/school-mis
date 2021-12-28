import {
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS,
} from "./StudentAttendanceConstants";

export const getAllStudentAttendanceInitialDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS:
      return { loading: false, studentAttendanceInitData: action.payload };
    case GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

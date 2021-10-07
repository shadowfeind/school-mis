import axios from "axios";
import {
  GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS,
} from "./AcademicYearCalendarConstant";

export const getAllAcademicYearCalendarAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/AcademicYearCalendar"
    );

    dispatch({ type: GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

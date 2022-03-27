import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
} from "./SearchTeacherFacultySubjectConstants";

export const getAllSearchTeacherFacSubInitialDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SearchTeacherFacultySubject/GetAllSearchTeacherFacultySubject?searchKey=1`,
        tokenConfig
      );
      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getAllSearchTeacherFacSubListDataAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SearchTeacherFacultySubject/GetListSearchTeacherFacultySubject?idTeacher=${id}`,
        tokenConfig
      );

      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

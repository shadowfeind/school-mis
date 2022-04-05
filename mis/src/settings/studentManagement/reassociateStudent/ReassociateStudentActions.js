import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_REASSOCIATE_STUDENTS_FAIL,
  GET_ALL_REASSOCIATE_STUDENTS_REQUEST,
  GET_ALL_REASSOCIATE_STUDENTS_SUCCESS,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_FAIL,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_FAIL,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_REQUEST,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_SUCCESS,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_REQUEST,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_SUCCESS,
  GET_REASSOCIATE_STUDENTS_LISTS_FAIL,
  GET_REASSOCIATE_STUDENTS_LISTS_REQUEST,
  GET_REASSOCIATE_STUDENTS_LISTS_SUCCESS,
  GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_FAIL,
  GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_REQUEST,
  GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_SUCCESS,
  PUT_REASSOCIATE_STUDENTS_FAIL,
  PUT_REASSOCIATE_STUDENTS_REQUEST,
  PUT_REASSOCIATE_STUDENTS_SUCCESS,
} from "./ReassociateStudentConstants";

export const getAllReassociateStudentsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_REASSOCIATE_STUDENTS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/ReassociateStudent/Get`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_REASSOCIATE_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_REASSOCIATE_STUDENTS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getReassociateStudentsListsAction =
  (year, program, shift, classId, section) => async (dispatch) => {
    try {
      dispatch({ type: GET_REASSOCIATE_STUDENTS_LISTS_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ReassociateStudent/GetAllReassociateStudent?idAcademicYear=${year}&idFacultyProgramLink=${program}&idShift=${shift}&idClass=${classId}&classSection=${section}`,
        tokenConfig
      );

      dispatch({ type: GET_REASSOCIATE_STUDENTS_LISTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LISTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getReassociateStudentsLevelupAction =
  (year, program, shift, classId, section) => async (dispatch) => {
    try {
      dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ReassociateStudent/GetBulkLevelUp?idAcademicYear=${year}&idFacultyProgramLink=${program}&idShift=${shift}&level=${classId}&classSection=${section}`,
        tokenConfig
      );

      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getReassociateStudentsLevelupPostAction =
  (checkboxState, searchFilterModel, academicYear,academicYearNext) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLst: checkboxState,
        searchFilterModel,
        academicYear,
        academicYearNext,
      });

      console.log(jsonData)

      const { data } = await axios.post(
        `${API_URL}/api/ReassociateStudent/PostBulkLevelUp`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };


  export const getSingleEditReassociateStudentsAction = (id,year,program,classId,shift,section) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_REQUEST });
  
      const { data } = await axios.get(
        `${API_URL}/api/ReassociateStudent/GetSingleToEditReassociateStudent/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}&idShift=${shift}&classSection=${section}`,
        tokenConfig
      );
  
      dispatch({ type: GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_EDIT_REASSOCIATE_STUDENTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };


  export const putReassociateStudentsAction =
  (checkboxState, searchFilterModel, year, academicYear) =>
  async (dispatch) => {
    try {
      dispatch({ type: PUT_REASSOCIATE_STUDENTS_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: checkboxState,
        searchFilterModel,
        academicYear,
      });

      const { data } = await axios.put(
        `${API_URL}/api/ReassociateStudent/PutReassociateStudent`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: PUT_REASSOCIATE_STUDENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PUT_REASSOCIATE_STUDENTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

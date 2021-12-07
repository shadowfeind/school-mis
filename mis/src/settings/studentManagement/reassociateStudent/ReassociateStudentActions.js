import axios from "axios";
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
} from "./ReassociateStudentConstants";

export const getAllReassociateStudentsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_REASSOCIATE_STUDENTS_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/ReassociateStudent"
    );

    dispatch({ type: GET_ALL_REASSOCIATE_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_REASSOCIATE_STUDENTS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReassociateStudentsListsAction =
  (year, program, shift, classId, section) => async (dispatch) => {
    try {
      dispatch({ type: GET_REASSOCIATE_STUDENTS_LISTS_REQUEST });

      const { data } = await axios.get(
        `http://192.168.1.103:84/api/GetAllReassociateStudent/${year}/${program}/${shift}/${classId}/${section}/getList`
      );

      dispatch({ type: GET_REASSOCIATE_STUDENTS_LISTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LISTS_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getReassociateStudentsLevelupAction =
  (year, program, shift, classId, section) => async (dispatch) => {
    try {
      dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_REQUEST });

      const { data } = await axios.get(
        `http://192.168.1.103:84/api/GetBulkLevelUp/${year}/${program}/${shift}/${classId}/${section}/getBulkLevelUpList`
      );

      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getReassociateStudentsLevelupPostAction =
  (checkboxState, searchFilterModel) => async (dispatch) => {
    try {
      dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLst: checkboxState,
        searchFilterModel,
        mode: 0,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.1.103:84/api/ReassociateStudent",
        jsonData,
        config
      );

      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

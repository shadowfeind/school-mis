import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS,
  GET_BULK_EXAM_APPROVAL_FAIL,
  GET_BULK_EXAM_APPROVAL_REQUEST,
  GET_BULK_EXAM_APPROVAL_SUCCESS,
  GET_INITIAL_EXAM_APPORVAL_DATA_FAIL,
  GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST,
  GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS,
  POST_BULK_EXAM_APPROVAL_FAIL,
  POST_BULK_EXAM_APPROVAL_REQUEST,
  POST_BULK_EXAM_APPROVAL_SUCCESS,
} from "./ExamMarkApprovalConstants";

export const getInitialExamApprovalDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST });

    const { data } =
      await axios.get(`${API_URL}/api/AcademicStudentExamData/GetAllAcademicStudentExamData
      `);

    dispatch({
      type: GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_EXAM_APPORVAL_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getExamApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetListExamMarkApproval/${year}/${program}/${classId}/${section}/${shift}/${event}/${schedule}/1
    `);

      dispatch({
        type: GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getBulkExamApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EXAM_APPROVAL_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetBulkMarkApproval/${year}/${program}/${classId}/${section}/${shift}/${event}/${schedule}/1/GetBulkAmrkApproval
    `);

      dispatch({
        type: GET_BULK_EXAM_APPROVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EXAM_APPROVAL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const postBulkExamMarkApprovalAction =
  (students, search) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_EXAM_APPROVAL_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLsts: students,
        searchFilterModel: search,
      });

      console.log(jsonData);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${API_URL}/api/ApproveAcademicStudentExamData/PostApproveAcademicStudentExamData`,
        jsonData,
        config
      );

      dispatch({ type: POST_BULK_EXAM_APPROVAL_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_EXAM_APPROVAL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

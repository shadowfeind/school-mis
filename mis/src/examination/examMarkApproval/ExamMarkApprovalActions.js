import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS,
  GET_INITIAL_EXAM_APPORVAL_DATA_FAIL,
  GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST,
  GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS,
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

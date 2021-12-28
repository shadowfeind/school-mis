import {
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS,
  GET_INITIAL_EXAM_APPORVAL_DATA_FAIL,
  GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST,
  GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS,
} from "./ExamMarkApprovalConstants";

export const getInitialExamApprovalDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS:
      return { loading: false, examApprovalInitialDatas: action.payload };
    case GET_INITIAL_EXAM_APPORVAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getExamApprovalSearchDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST:
      return { loading: true };
    case GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS:
      return { loading: false, searchData: action.payload, success: true };
    case GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

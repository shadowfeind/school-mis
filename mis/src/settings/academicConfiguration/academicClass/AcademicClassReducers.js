import {
  ACADEMIC_CLASS_CREATE_FAIL,
  ACADEMIC_CLASS_CREATE_REQUEST,
  ACADEMIC_CLASS_CREATE_RESET,
  ACADEMIC_CLASS_CREATE_SUCCESS,
  GET_ALL_ACADEMIC_CLASS_FAIL,
  GET_ALL_ACADEMIC_CLASS_REQUEST,
  GET_ALL_ACADEMIC_CLASS_SUCCESS,
} from "./AcademicClassConstants";

export const getAllAcademicClass = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_CLASS_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_CLASS_SUCCESS:
      return { loading: false, academicClass: action.payload };
    case GET_ALL_ACADEMIC_CLASS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createAcademicClassReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_CLASS_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_CLASS_CREATE_SUCCESS:
      return { loading: false, academicClass: action.payload, success: true };
    case ACADEMIC_CLASS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_CLASS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

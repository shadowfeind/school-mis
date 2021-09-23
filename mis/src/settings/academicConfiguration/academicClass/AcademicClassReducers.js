import {
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

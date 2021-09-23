import {
  GET_ALL_ACADEMIC_SECTION_FAIL,
  GET_ALL_ACADEMIC_SECTION_REQUEST,
  GET_ALL_ACADEMIC_SECTION_SUCCESS,
} from "./AcademicSectionConstants";

export const getAllAcademicSection = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_SECTION_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_SECTION_SUCCESS:
      return { loading: false, academicSection: action.payload };
    case GET_ALL_ACADEMIC_SECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

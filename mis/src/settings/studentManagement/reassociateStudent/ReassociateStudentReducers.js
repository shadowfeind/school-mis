import {
  GET_ALL_REASSOCIATE_STUDENTS_FAIL,
  GET_ALL_REASSOCIATE_STUDENTS_REQUEST,
  GET_ALL_REASSOCIATE_STUDENTS_SUCCESS,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_FAIL,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_FAIL,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_REQUEST,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_RESET,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_SUCCESS,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_REQUEST,
  GET_REASSOCIATE_STUDENTS_LEVEL_UP_SUCCESS,
  GET_REASSOCIATE_STUDENTS_LISTS_FAIL,
  GET_REASSOCIATE_STUDENTS_LISTS_REQUEST,
  GET_REASSOCIATE_STUDENTS_LISTS_SUCCESS,
} from "./ReassociateStudentConstants";

export const getAllReassociateStudentsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_REASSOCIATE_STUDENTS_REQUEST:
      return { loading: true };
    case GET_ALL_REASSOCIATE_STUDENTS_SUCCESS:
      return { loading: false, allReassociateStudents: action.payload };
    case GET_ALL_REASSOCIATE_STUDENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getReassociateStudentsListsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REASSOCIATE_STUDENTS_LISTS_REQUEST:
      return { loading: true };
    case GET_REASSOCIATE_STUDENTS_LISTS_SUCCESS:
      return { loading: false, reassociateStudentLists: action.payload };
    case GET_REASSOCIATE_STUDENTS_LISTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getReassociateStudentsLevelupReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REASSOCIATE_STUDENTS_LEVEL_UP_REQUEST:
      return { loading: true };
    case GET_REASSOCIATE_STUDENTS_LEVEL_UP_SUCCESS:
      return { loading: false, reassociateStudentLevel: action.payload };
    case GET_REASSOCIATE_STUDENTS_LEVEL_UP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getReassociateStudentsLevelupPostReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_REQUEST:
      return { loading: true };
    case GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_SUCCESS:
      return { loading: false, success: true };
    case GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_FAIL:
      return { loading: false, error: action.payload };
    case GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_RESET:
      return {};
    default:
      return state;
  }
};

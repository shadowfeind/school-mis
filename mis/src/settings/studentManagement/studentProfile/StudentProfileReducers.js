import {
    GET_ALL_STUDENT_PROFILE_REQUEST,
    GET_ALL_STUDENT_PROFILE_SUCCESS,
    GET_ALL_STUDENT_PROFILE_FAIL,
} from "./StudentProfileConstants";

export const getAllStudentProfile = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_STUDENT_PROFILE_REQUEST:
            return { loading: true };
        case GET_ALL_STUDENT_PROFILE_SUCCESS:
            return { loading: false, studentProfile: action.payload };
        case GET_ALL_STUDENT_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


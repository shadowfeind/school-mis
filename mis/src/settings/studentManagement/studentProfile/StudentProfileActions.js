import axios from "axios";
import {
    GET_ALL_STUDENT_PROFILE_REQUEST,
    GET_ALL_STUDENT_PROFILE_SUCCESS,
    GET_ALL_STUDENT_PROFILE_FAIL,
    GET_ALL_STUDENT_PROFILE_CREATE_REQUEST,
} from "./StudentProfileConstants";

export const getAllStudentProfileAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_STUDENT_PROFILE_REQUEST });

        const { data } = await axios.get("http://192.168.1.103:84/api/GetStudentProfile");

        dispatch({ type: GET_ALL_STUDENT_PROFILE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: GET_ALL_STUDENT_PROFILE_FAIL,
            payload:
                error.message && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };

};


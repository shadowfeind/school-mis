import axios from "axios";
import {
  ACADEMIC_CLASS_CREATE_FAIL,
  ACADEMIC_CLASS_CREATE_REQUEST,
  ACADEMIC_CLASS_CREATE_SUCCESS,
  GET_ALL_ACADEMIC_CLASS_FAIL,
  GET_ALL_ACADEMIC_CLASS_REQUEST,
  GET_ALL_ACADEMIC_CLASS_SUCCESS,
} from "./AcademicClassConstants";

export const getAllAcademicClassAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_CLASS_REQUEST });

    const { data } = await axios.get(
      "http://localhost:5000/api/mock/academicClass"
    );

    dispatch({ type: GET_ALL_ACADEMIC_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_CLASS_FAIL,
      payload: error.message,
    });
  }
};

export const academicClassCreateAction =
  (academicClass) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_CLASS_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicClass });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.1.103:84/api/HRACADEMIC_CLASS",
        jsonData,
        config
      );

      dispatch({ type: ACADEMIC_CLASS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_CLASS_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

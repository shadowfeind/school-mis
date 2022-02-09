import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  CREATE_SINGLE_STUDENT_REGISTRATION_FAIL,
  CREATE_SINGLE_STUDENT_REGISTRATION_REQUEST,
  CREATE_SINGLE_STUDENT_REGISTRATION_SUCCESS,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_FAIL,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_STUDENT_REGISTRATION_DATA_FAIL,
  GET_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_STUDENT_REGISTRATION_DATA_SUCCESS,
  SINGLE_STUDENT_REGISTRATION_CREATE_FAIL,
  SINGLE_STUDENT_REGISTRATION_CREATE_REQUEST,
  SINGLE_STUDENT_REGISTRATION_CREATE_SUCCESS,
  SINGLE_STUDENT_REGISTRATION_EDIT_FAIL,
  SINGLE_STUDENT_REGISTRATION_EDIT_REQUEST,
  SINGLE_STUDENT_REGISTRATION_EDIT_SUCCESS,
} from "./StudentRegistrationConstants";

export const getInitialStudentRegistrationDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_INITIAL_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentRegistration/GetAllStudentRegistration
        `,
        tokenConfig
      );

      dispatch({
        type: GET_INITIAL_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_INITIAL_STUDENT_REGISTRATION_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getStudentRegistrationDataAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentRegistration/GetListStudentRegistration?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig
      );

      dispatch({
        type: GET_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_STUDENT_REGISTRATION_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleStudentRegistrationDataAction =
  (id, year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentRegistration/GetSingleForDatailStudentRegistration/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const singleStudentRegistrationCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_STUDENT_REGISTRATION_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/StudentRegistration/GetSingleToCreate`,
      tokenConfig
    );

    dispatch({
      type: SINGLE_STUDENT_REGISTRATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_STUDENT_REGISTRATION_CREATE_FAIL,

      payload: error.message ? error.message : error.Message,
    });
  }
};

export const singleStudentRegistrationEditAction =
  (studentReg, image, year, program, classId, searchFilterModel) =>
  async (dispatch) => {
    try {
      dispatch({ type: SINGLE_STUDENT_REGISTRATION_EDIT_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/StudentRegistrationImage/Put`,
        formData,
        tokenConfig
      );

      if (data) {
        const newData = { ...studentReg, photoName: data };
        const jsonData = JSON.stringify({
          dbModel: newData,
          idAcademicYear: year,
          idFacultyProgramLink: program,
          IDLevel: classId,
          searchFilterModel: searchFilterModel,
        });

        await axios.put(
          `${API_URL}/api/StudentRegistration/Put`,
          jsonData,
          tokenConfig
        );
      }

      dispatch({
        type: SINGLE_STUDENT_REGISTRATION_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: SINGLE_STUDENT_REGISTRATION_EDIT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getCreateSingleStudentRegistrationDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentRegistration/GetSingleToCreate`,
        tokenConfig
      );

      dispatch({
        type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,

        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const createSingleStudentRegistrationAction =
  (studentReg, image) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SINGLE_STUDENT_REGISTRATION_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data } = await axios.put(
        `${API_URL}/api/StudentRegistrationImage/Put`,
        formData,
        tokenConfig
      );

      if (data) {
        const newData = { ...studentReg, photoName: data };
        const jsonData = JSON.stringify({
          dbModel: newData,
          idAcademicYear: studentReg.idAcademicYear,
        });

        await axios.post(
          `${API_URL}/api/StudentRegistration/Post`,
          jsonData,
          tokenConfig
        );
      } else {
        const newData = { ...studentReg, photoName: "" };
        const jsonData = JSON.stringify({
          dbModel: newData,
          idAcademicYear: studentReg.idAcademicYear,
        });
        console.log(jsonData);

        await axios.post(
          `${API_URL}/api/StudentRegistration/Post`,
          jsonData,
          tokenConfig
        );
      }

      dispatch({
        type: CREATE_SINGLE_STUDENT_REGISTRATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: CREATE_SINGLE_STUDENT_REGISTRATION_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

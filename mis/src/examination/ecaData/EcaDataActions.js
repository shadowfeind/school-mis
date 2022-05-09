import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_ALL_ECA_DATA_FAIL,
  GET_ALL_ECA_DATA_REQUEST,
  GET_ALL_ECA_DATA_SUCCESS,
  GET_BULK_EDIT_ECA_DATA_FAIL,
  GET_BULK_EDIT_ECA_DATA_REQUEST,
  GET_BULK_EDIT_ECA_DATA_SUCCESS,
  GET_LIST_ECA_DATA_FAIL,
  GET_LIST_ECA_DATA_REQUEST,
  GET_LIST_ECA_DATA_SUCCESS,
  POST_BULK_ECA_DATA_FAIL,
  POST_BULK_ECA_DATA_REQUEST,
  POST_BULK_ECA_DATA_SUCCESS,
} from "./EcaDataConstants";

export const getAllEcaDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ECA_DATA_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/ECAData/GetAllECAData`,
      tokenConfig
    );
    dispatch({
      type: GET_ALL_ECA_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ECA_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getBulkEditEcaDataAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EDIT_ECA_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ECAData/GetBulkToCreateAssignECAData?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_BULK_EDIT_ECA_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EDIT_ECA_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getListEcaDataAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_ECA_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ECAData/GetListECAData?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_LIST_ECA_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_ECA_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const postBulkEditEcaAction =
  (students, search, ecaData) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_ECA_DATA_REQUEST });

      // console.log(students);
      // console.log(typeof students);
      // let ecaData = [];

      // let test = students.map((s) => [...s.ECAValue]);

      // ecaData.push(test);
      // console.log(ecaData);

      const jsonData = JSON.stringify({
        dbModelLst: students,
        searchFilterModel: search,
        ddlAcademicFacultyECASubModel: ecaData,
      });

      console.log("this is the one", jsonData);

      await axios.post(
        `${API_URL}/api/ECAData/PostECAData`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: POST_BULK_ECA_DATA_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_ECA_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

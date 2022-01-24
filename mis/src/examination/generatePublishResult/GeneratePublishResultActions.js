import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_ALL_GENERATE_FAIL,
  GET_ALL_GENERATE_PUBLISH_FAIL,
  GET_ALL_GENERATE_PUBLISH_REQUEST,
  GET_ALL_GENERATE_PUBLISH_SUCCESS,
  GET_ALL_GENERATE_REQUEST,
  GET_ALL_GENERATE_SUCCESS,
} from "./GeneratePublishResultConstants";

export const getAllGeneratePublishAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_GENERATE_PUBLISH_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GeneratePublishResult/GetAllGeneratePublish
      `,
      tokenConfig
    );

    dispatch({
      type: GET_ALL_GENERATE_PUBLISH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_GENERATE_PUBLISH_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllGenerateAction =
  (year, program, level, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_GENERATE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GeneratePublishResult/GetListGeneratePublishResult?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${level}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_ALL_GENERATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_GENERATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
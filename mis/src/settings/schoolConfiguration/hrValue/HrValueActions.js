import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_HR_VALUE_FAIL,
  GET_ALL_HR_VALUE_REQUEST,
  GET_ALL_HR_VALUE_SUCCESS,
  GET_LIST_HR_VALUE_FAIL,
  GET_LIST_HR_VALUE_REQUEST,
  GET_LIST_HR_VALUE_SUCCESS,
  GET_SINGLE_TO_CREATE_HR_VALUE_FAIL,
  GET_SINGLE_TO_CREATE_HR_VALUE_REQUEST,
  GET_SINGLE_TO_CREATE_HR_VALUE_SUCCESS,
  GET_SINGLE_TO_EDIT_HR_VALUE_FAIL,
  GET_SINGLE_TO_EDIT_HR_VALUE_REQUEST,
  GET_SINGLE_TO_EDIT_HR_VALUE_SUCCESS,
  POST_HR_VALUE_FAIL,
  POST_HR_VALUE_REQUEST,
  POST_HR_VALUE_SUCCESS,
  PUT_HR_VALUE_FAIL,
  PUT_HR_VALUE_REQUEST,
  PUT_HR_VALUE_SUCCESS,
} from "./HrValueConstants";

export const getALLHrValueAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HR_VALUE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HRValue/GetAllHRValue`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HR_VALUE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListHrValueAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_HR_VALUE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HRValue/GetListHRValue?company=${company}&searchKey=1`,
      tokenConfig
    );

    dispatch({ type: GET_LIST_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_HR_VALUE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleCreateHrValueAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_HR_VALUE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HRValue/GetSingleToCreateHRValue?company=${company}&searchKey=1`,
      tokenConfig
    );

    dispatch({ type: GET_SINGLE_TO_CREATE_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_HR_VALUE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEditHrValueAction = (id, company) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_HR_VALUE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HRValue/GetSingleToEditHRValue/${id}?company=${company}&searchKey=1`,
      tokenConfig
    );

    dispatch({ type: GET_SINGLE_TO_EDIT_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_HR_VALUE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const postCreateHrValueAction =
  (dbData, image, image1, image2) => async (dispatch) => {
    try {
      dispatch({ type: POST_HR_VALUE_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data: headerBanner } = await axios.post(
        `${API_URL}/api/HRValue/FileUploadHeaderBanner
        `,
        formData,
        tokenConfig
      );

      let formData1 = new FormData();
      formData1.append("ImageUploaded1", image1);

      const { data: schoolLookup } = await axios.post(
        `${API_URL}/api/HRValue/FileUploadSchoolLogo
        `,
        formData1,
        tokenConfig
      );

      let formData2 = new FormData();
      formData2.append("ImageUploaded2", image2);

      const { data: PrincipleSignature } = await axios.post(
        `${API_URL}/api/HRValue/FileUploadPrincipleSignature
        `,
        formData2,
        tokenConfig
      );

      if ((headerBanner, schoolLookup, PrincipleSignature)) {
        const newData = {
          ...dbData,
          HeaderBanner: headerBanner,
          SchoolLogo: schoolLookup,
          PrincipleSignature: PrincipleSignature,
        };

        const jsonData = JSON.stringify({ dbModel: newData });
        console.log(jsonData);
        await axios.post(
          `${API_URL}/api/HRValue/PostHRValue`,
          jsonData,
          tokenConfig
        );
      }
      dispatch({
        type: POST_HR_VALUE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POST_HR_VALUE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const putEditHrValueAction =
  (dbData, image, image1, image2) => async (dispatch) => {
    try {
      dispatch({ type: PUT_HR_VALUE_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);
debugger;
      const { data: headerBanner } = await axios.post(
        `${API_URL}/api/HRValue/FileUploadHeaderBanner
        `,
        formData,
        tokenConfig
      );

      let formData1 = new FormData();
      formData1.append("ImageUploaded1", image1);

      const { data: schoolLookup } = await axios.post(
        `${API_URL}/api/HRValue/FileUploadSchoolLogo
        `,
        formData1,
        tokenConfig
      );

      let formData2 = new FormData();
      formData2.append("ImageUploaded2", image2);

      const { data: PrincipleSignature } = await axios.post(
        `${API_URL}/api/HRValue/FileUploadPrincipleSignature
        `,
        formData2,
        tokenConfig
      );
      debugger;

      if ((headerBanner, schoolLookup, PrincipleSignature)) {
        const newData = {
          ...dbData,
          HeaderBanner: headerBanner,
          SchoolLogo: schoolLookup,
          PrincipleSignature: PrincipleSignature,
        };
debugger;
        const jsonData = JSON.stringify({ dbModel: newData})
    console.log(jsonData);
        await axios.put(
          `${API_URL}/api/HRValue/PutHRValue`,
          jsonData,
          tokenConfig
        );
      }
      dispatch({
        type: PUT_HR_VALUE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PUT_HR_VALUE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_ALL_OLD_QUESTIONS_FAIL,
  GET_ALL_OLD_QUESTIONS_REQUEST,
  GET_ALL_OLD_QUESTIONS_SUCCESS,
  GET_LIST_OF_OLD_QUESTIONS_FAIL,
  GET_LIST_OF_OLD_QUESTIONS_REQUEST,
  GET_LIST_OF_OLD_QUESTIONS_SUCCESS,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_FAIL,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_REQUEST,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_SUCCESS,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_FAIL,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_REQUEST,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_SUCCESS,
  GET_SUBJECT_OF_OLD_QUESTIONS_FAIL,
  GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST,
  GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS,
  POST_FILE_UPLOAD_OLD_QUESTIONS_FAIL,
  POST_FILE_UPLOAD_OLD_QUESTIONS_REQUEST,
  POST_FILE_UPLOAD_OLD_QUESTIONS_SUCCESS,
  POST_OLD_QUESTIONS_FAIL,
  POST_OLD_QUESTIONS_REQUEST,
  POST_OLD_QUESTIONS_SUCCESS,
  PUT_OLD_QUESTIONS_FAIL,
  PUT_OLD_QUESTIONS_REQUEST,
  PUT_OLD_QUESTIONS_SUCCESS,
} from "./OldQuestionsConstants";

export const getAllOldQuestionsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_OLD_QUESTIONS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/OldQuestion/GetAllOldQuestion`,
      tokenConfig
    );

    dispatch({
      type: GET_ALL_OLD_QUESTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_OLD_QUESTIONS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListOldQuestionsAction =
  (classId, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_OF_OLD_QUESTIONS_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/OldQuestion/GetListOldQuestion?level=${classId}&idAcademicSubject=${subject}`,
        tokenConfig
      );

      dispatch({
        type: GET_LIST_OF_OLD_QUESTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_OF_OLD_QUESTIONS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSubjectOldQuestionsAction = (classId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/OldQuestion/GetSubjectByIDLevel?level=${classId}`,
      tokenConfig
    );

    dispatch({
      type: GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS,
      payload: data,
      query: { classId },
    });
  } catch (error) {
    dispatch({
      type: GET_SUBJECT_OF_OLD_QUESTIONS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleCreateOldQuestionsAction =
  (classId, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_CREATE_OLD_QUESTIONS_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/OldQuestion/GetSingleToCreateOldQuestion?level=${classId}&idAcademicSubject=${subject}`,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_TO_CREATE_OLD_QUESTIONS_SUCCESS,
        payload: data,
        query: { classId, subject },
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_CREATE_OLD_QUESTIONS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleEditOldQuestionsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_OLD_QUESTIONS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/OldQuestion/GetSingleToEditOldQuestion/${id}`,
      tokenConfig
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_OLD_QUESTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_OLD_QUESTIONS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const putOldQuestionsAction = (oldQuestions) => async (dispatch) => {
  try {
    dispatch({ type: PUT_OLD_QUESTIONS_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: oldQuestions,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    await axios.put(
      `${API_URL}/api/OldQuestion/PutOldQuestion`,
      jsonData,
      tokenConfig
    );

    dispatch({
      type: PUT_OLD_QUESTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PUT_OLD_QUESTIONS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

// export const postOldQuestionsAction = (oldQuestions) => async (dispatch) => {
//   try {
//     dispatch({ type: POST_OLD_QUESTIONS_REQUEST });

//     const jsonData = JSON.stringify({
//       dbModel: { ...oldQuestions },
//     });

//     // const config = {
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     // };

//     await axios.post(
//       `${API_URL}/api/OldQuestion/PostOldQuestion`,
//       jsonData,
//       tokenConfig
//     );

//     dispatch({
//       type: POST_OLD_QUESTIONS_SUCCESS,
//     });
//   } catch (error) {
//     dispatch({
//       type: POST_OLD_QUESTIONS_FAIL,
//       payload: error.message ? error.message : error.Message,
//     });
//   }
// };

// export const postFileUploadOldQuestionsAction =
//   (oldQuestions) => async (dispatch) => {
//     try {
//       dispatch({ type: POST_FILE_UPLOAD_OLD_QUESTIONS_REQUEST });

//       const jsonData = JSON.stringify({
//         dbModel: { ...oldQuestions },
//       });

//       // const config = {
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       // };

//       await axios.post(
//         `${API_URL}/api/OldQuestion/FileUpload`,
//         jsonData,
//         tokenConfig
//       );

//       dispatch({
//         type: POST_FILE_UPLOAD_OLD_QUESTIONS_SUCCESS,
//       });
//     } catch (error) {
//       dispatch({
//         type: POST_FILE_UPLOAD_OLD_QUESTIONS_FAIL,
//         payload: error.message ? error.message : error.Message,
//       });
//     }
//   };

export const postOldQuestionsAction =
  (oldQuestions, image, searchFilterModel) => async (dispatch) => {
    try {
      dispatch({ type: POST_OLD_QUESTIONS_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data } = await axios.post(
        `${API_URL}/api/OldQuestion/FileUpload`,
        formData,
        tokenConfig
      );

      if (data) {
        const newData = { ...oldQuestions, OldQuestionName: data };
        const jsonData = JSON.stringify({
          dbModel: newData,
          searchFilterModel,
        });
        console.log(jsonData);

        await axios.post(
          `${API_URL}/api/OldQuestion/PostOldQuestion`,
          jsonData,
          tokenConfig
        );
      }

      dispatch({
        type: POST_OLD_QUESTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_OLD_QUESTIONS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

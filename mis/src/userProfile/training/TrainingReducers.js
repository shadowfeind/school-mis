import {
  GET_ALL_TRAINING_FAIL,
  GET_ALL_TRAINING_REQUEST,
  GET_ALL_TRAINING_RESET,
  GET_ALL_TRAINING_SUCCESS,
} from "./TrainingConstants";

export const getAllTrainingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TRAINING_REQUEST:
      return { loading: true };
    case GET_ALL_TRAINING_SUCCESS:
      return { loading: false, getAllTraining: action.payload };
    case GET_ALL_TRAINING_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TRAINING_RESET:
      return {};
    default:
      return state;
  }
};

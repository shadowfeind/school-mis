import {
  GET_INITIAL_LEVEL_TEST_DATA_FAIL,
  GET_INITIAL_LEVEL_TEST_DATA_REQUEST,
  GET_INITIAL_LEVEL_TEST_DATA_SUCCESS,
} from "./LevelTestConstants";

export const getInitialLevelTestDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_LEVEL_TEST_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_LEVEL_TEST_DATA_SUCCESS:
      return { loading: false, levelTestInitialDatas: action.payload };
    case GET_INITIAL_LEVEL_TEST_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

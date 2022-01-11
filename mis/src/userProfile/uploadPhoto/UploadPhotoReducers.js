import {
  GET_ALL_UPLOADPHOTO_FAIL,
  GET_ALL_UPLOADPHOTO_REQUEST,
  GET_ALL_UPLOADPHOTO_RESET,
  GET_ALL_UPLOADPHOTO_SUCCESS,
} from "./UploadPhotoConstants";

export const getAllUploadPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_UPLOADPHOTO_REQUEST:
      return { loading: true };
    case GET_ALL_UPLOADPHOTO_SUCCESS:
      return { loading: false, getAllUploadPhoto: action.payload };
    case GET_ALL_UPLOADPHOTO_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_UPLOADPHOTO_RESET:
      return {};
    default:
      return state;
  }
};

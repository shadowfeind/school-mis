// export const API_URL = "http://103.90.86.151:84";
// export const API_URL = "http://103.90.86.151:100";
// export const API_URL = "http://192.168.1.85:88";

import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment";

export const API_URL = "http://vidyacube.com";
// export const API_URL = "http://localhost:4995";

const USER_SESSION = sessionStorage.getItem("blueberrytoken")
  ? sessionStorage.getItem("blueberrytoken")
  : null;

let userSession = sessionStorage.getItem("blueberrytoken")
  ? sessionStorage.getItem("blueberrytoken")
  : null;

// let userSession =
//   "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZTY4N2Q3Zi0zZGRkLTQ3NmMtYmMzNi1jZGY2N2ViNzhlMjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkNyZWF0aW9uICBBY2FkZW15IiwicGlkUmVmRm9yRWRpdCI6IlJvb3RVc2VyIiwiZXhwIjoxNjQ4NzU5ODMxLCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.q6lZ1IfygRAuKGnNw0WpQvEkPYDpUe9NNBUNQnH1yI0";

// let userRefreshToken = "T9P434k9704MVuPnR0ga0C6XXnlZLooPPX8qf68+90Q=";
//for JWT token for dev mode
export const tokenConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNWJjNjRlOC05NWJjLTQxNTEtYWY1NS1kNTkzYWM3N2I1NDMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkNyZWF0aW9uICBBY2FkZW15IiwicGlkUmVmRm9yRWRpdCI6IlJvb3RVc2VyIiwiZXhwIjoxNjUwNTkzMzM4LCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.0x2zblMwxprmR0CfFiITtGnh6vzYNxpUuvX2Ftzn2bk`,
  },
};

let userRefreshToken = sessionStorage.getItem("blueberryrefreshtoken")
  ? sessionStorage.getItem("blueberryrefreshtoken")
  : null;

//for fcm token
export const tokenHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `key=AAAACB9i9IE:APA91bEuqomtN9gss5UOVzngtIofWkWo9tUWAZ_2LYBNeKbuZXXns-S6NuBWEgYCnQj8gsI6YbvlbxKIByeYvHjgf2U-GjTTPCB44_K6yjcPhvDHqQD5WaUCshNEDzAuz3r91MeBJe3D`,
  },
};

// export const tokenConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${USER_SESSION}`,
//   },
// };

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const user = jwt_decode(userSession);
  const isExpired = user.exp - moment().unix() < 1;
  console.log(user.exp);
  console.log(moment.unix(user.exp));
  console.log(moment().unix());
  console.log(isExpired);

  if (!isExpired) return req;

  const dataForRefreshToken = {
    AccessToken: userSession,
    RefreshToken: userRefreshToken,
  };

  const JSONdata = JSON.stringify(dataForRefreshToken);
  const config = { headers: { "Content-Type": "application/json" } };

  console.log(JSONdata);

  try {
    const { data } = await axios.post(
      "http://vidyacube.com/api/RefreshTokenGenerator/RefreshToken",
      JSONdata,
      config
    );
    console.log(data);

    sessionStorage.setItem("blueberrytoken", data.AccessToken);
    userSession = data.AccessToken;
    req.headers.Authorization = `Bearer ${data.AccessToken}`;
  } catch (error) {
    console.log(
      error.response.data.Message ? error.response.data.Message : error.message
    );
  }

  return req;
});

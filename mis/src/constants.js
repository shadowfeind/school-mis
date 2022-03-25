// export const API_URL = "http://103.90.86.151:84";
// export const API_URL = "http://103.90.86.151:100";
// export const API_URL = "http://192.168.1.85:88";


// import jwt_decode from "jwt-decode";
// import axios from "axios";
// import moment from "moment";


export const API_URL = "http://vidyacube.com";

export const USER_SESSION = sessionStorage.getItem("blueberrytoken");
// let userSession = sessionStorage.getItem("blueberrytoken")
//   ? sessionStorage.getItem("blueberrytoken")
//   : null;

let userSession =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYmU1NzRiZS0yZTVkLTRmNjctOGQxOC0zNTZhNDAzNWI4NzciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkNyZWF0aW9uICBBY2FkZW15IiwicGlkUmVmRm9yRWRpdCI6IlJvb3RVc2VyIiwiZXhwIjoxNjQ3OTMyNDc4LCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.eECywAUUsWn-1WxXwWher_JnfBzU3J3NWUT0xBw1dBo";

let userRefreshToken = "4PEcOolmZ0FDDtPLjeYMsC/Lh9I9qgQr1aENDn3K5NU=";
//for JWT token for dev mode
// export const tokenConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNWJjNjRlOC05NWJjLTQxNTEtYWY1NS1kNTkzYWM3N2I1NDMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkNyZWF0aW9uICBBY2FkZW15IiwicGlkUmVmRm9yRWRpdCI6IlJvb3RVc2VyIiwiZXhwIjoxNjUwNTkzMzM4LCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.0x2zblMwxprmR0CfFiITtGnh6vzYNxpUuvX2Ftzn2bk`,
//   },
// };

//for fcm token
export const tokenHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `key=AAAACB9i9IE:APA91bEuqomtN9gss5UOVzngtIofWkWo9tUWAZ_2LYBNeKbuZXXns-S6NuBWEgYCnQj8gsI6YbvlbxKIByeYvHjgf2U-GjTTPCB44_K6yjcPhvDHqQD5WaUCshNEDzAuz3r91MeBJe3D`,
  },
};

export const tokenConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${USER_SESSION}`,
  },
};

// export const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${userSession}`,
//   },
// });

// axiosInstance.interceptors.request.use(async (req) => {
//   const user = jwt_decode(userSession);
//   const isExpired = user.exp - moment().unix() < 1;
//   console.log(user.exp);
//   console.log(moment.unix(user.exp));
//   console.log(moment().unix());
//   console.log(isExpired);

//   if (!isExpired) return req;

//   const dataForRefreshToken = {
//     AccessToken: userSession,
//     RefreshToken: userRefreshToken,
//   };

//   const JSONdata = JSON.stringify(dataForRefreshToken);
//   const config = { header: { "Content-Type": "application/json" } };

//   const { data } = await axios.post(
//     "http://vidyacube.com/api/RefreshTokenGenerator/RefreshToken",
//     JSONdata,
//     config
//   );

//   sessionStorage.setItem("blueberrytoken", data);
//   req.headers.Authorization = `Bearer ${data}`;
//   return req;
// });

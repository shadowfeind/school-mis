// export const API_URL = "http://103.90.86.151:84";
// export const API_URL = "http://103.90.86.151:100";
// export const API_URL = "http://192.168.1.85:88";

export const API_URL = "http://vidyacube.com";

export const USER_SESSION = sessionStorage.getItem("blueberrytoken");

export const tokenConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNWJjNjRlOC05NWJjLTQxNTEtYWY1NS1kNTkzYWM3N2I1NDMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkNyZWF0aW9uICBBY2FkZW15IiwicGlkUmVmRm9yRWRpdCI6IlJvb3RVc2VyIiwiZXhwIjoxNjUwNTkzMzM4LCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.0x2zblMwxprmR0CfFiITtGnh6vzYNxpUuvX2Ftzn2bk`,
  },
};

// export const tokenConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${USER_SESSION}`,
//   },
// };

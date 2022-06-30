require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

import { USER_SESSION } from "./constants";

// if (USER_SESSION) {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById("app")
//   );
// } else {
//   window.location.href = "http://103.90.86.151:100/";
// }

// sessionStorage.setItem(
//   "blueberrytoken",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5OGZiYTA0Zi1jYjJmLTQwYjUtODlhNy0xNmUzMDVhYzhiYzYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkRpdmluZSBMaWdodCBTY2hvb2wiLCJwaWRSZWZGb3JFZGl0IjoiUm9vdFVzZXIiLCJleHAiOjE2NTcyNjY2NjAsImlzcyI6Imh0dHA6Ly9teXNpdGUuY29tIiwiYXVkIjoiaHR0cDovL215c2l0ZS5jb20ifQ._LBfjsedx4ZTs84X_FBy-fQcOfXhf4mCoHRKEOL9iHc"
// );
// sessionStorage.setItem(
//   "blueberryrefreshtoken",
//   "ObasqDZg3FA1EuXz8F4Z/3i3FLpbCFE9AbvmUL8dZrQ="
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

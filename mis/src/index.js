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

sessionStorage.setItem(
  "blueberrytoken",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNmU3MTczNC1jY2IwLTRiNjMtOTljZS0zYzE1MzMyZGU3NjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkRpdmluZSBMaWdodCBTY2hvb2wiLCJwaWRSZWZGb3JFZGl0IjoiZGl2aW5lIiwiZXhwIjoxNjU2MjQ4MjM5LCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.qeZSKF2AmZ0uGGohcX7Mx6nRQZGLs7HJTZHW7yYfgPM"
);
sessionStorage.setItem(
  "blueberryrefreshtoken",
  "eRu7ONHajFRvlLxi1Crel3k0YOKKdbQ5D4Wd039k1Ro="
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

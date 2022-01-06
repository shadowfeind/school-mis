export const API_URL = "http://192.168.1.85:88";

export const USER_SESSION = sessionStorage.getItem("blueberrytoken")
  ? JSON.parse(sessionStorage.getItem("blueberrytoken"))
  : null;

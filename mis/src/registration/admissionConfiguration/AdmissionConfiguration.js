import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AdmissionConfiguration = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "registration" });
  }, [dispatch]);
  return <div>Test</div>;
};

export default AdmissionConfiguration;

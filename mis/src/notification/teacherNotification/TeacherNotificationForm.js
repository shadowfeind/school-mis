import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { makeStyles } from "@material-ui/styles";
import { postTeacherNotificationAction } from "./TeacherNotificationActions";
import CheckBoxControl from "../../components/controls/CheckBoxControl";

const initialFormValues = {
  IDTeacherNotification: 0,
  SenderID: 0,
  ReceiverID: 0,
  MessageHeading: "",
  MessageDescription: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-03-23T06:49:58.370Z",
  Updated_On: "2022-03-23T06:49:58.370Z",
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TeacherNotificationForm = ({ setOpenPopup, fcmTokenList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.MessageHeading = !fieldValues.MessageHeading
      ? "This Field is Required"
      : "";
    temp.MessageDescription = !fieldValues.MessageDescription
      ? "This Field is Required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(postTeacherNotificationAction(values, fcmTokenList));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={12}>
            <InputControl
              name="MessageHeading"
              label="Message Heading"
              value={values.MessageHeading}
              onChange={handleInputChange}
              errors={errors.MessageHeading}
            />
          </Grid>
          <Grid item xs={12}>
            <InputControl
              name="MessageDescription"
              label="Message Descriptions"
              multiline
              rows={4}
              value={values.MessageDescription}
              onChange={handleInputChange}
              errors={errors.MessageDescription}
            />

            <CheckBoxControl
              name="IsActive"
              label="IsActive"
              value={values.IsActive}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "10px",
            marginTop: "10px",
            borderTop: "1px solid #f3f3f3",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenPopup(false)}
            style={{ margin: "10px 0 0 10px" }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "10px 0 0 10px" }}
          >
            SUBMIT
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TeacherNotificationForm;
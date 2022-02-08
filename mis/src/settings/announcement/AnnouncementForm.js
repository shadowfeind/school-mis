import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import { announcementCreateAction, updateSingleAnnouncementAction } from "./AnnouncementAction";


const initialFormValues = {
  Id: 0,
  NewsHeading: "",
  NewsDescription: "",
  PostedBy: "",
  EffectiveFrom: "2022-01-27T04:45:28.146Z",
  IDHRCompany: 0,
  NoticeImage: "",
  IDHREmployee: 0,
  IsActive: true,
  Created_On: "2022-01-27T04:45:28.146Z",
  Updated_On: "2022-01-27T04:45:28.146Z",
};

const AnnouncementForm = ({ announcement, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.NewsHeading = !fieldValues.NewsHeading
      ? "This feild is required"
      : !fieldValues.NewsHeading.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.NewsHeading.trim()
      ? "This feild is required"
      : "";

    temp.NewsDescription = !fieldValues.NewsDescription
      ? "This feild is required"
      : !fieldValues.NewsDescription.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.NewsDescription.trim()
      ? "This feild is required"
      : "";

      temp.IsActive = !fieldValues.IsActive
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDHREmployee === 0) {
        dispatch(announcementCreateAction(values));
      } else {
        dispatch(updateSingleAnnouncementAction(values));
      }
    }
  };

  useEffect(() => {
    if (announcement) {
      setValues({ ...announcement });
    }
  }, [announcement]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="NewsHeading"
            label="News Heading*"
            value={values.NewsHeading}
            onChange={handleInputChange}
            errors={errors.NewsHeading}
          />

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            errors={errors.IsActive}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="NewsDescription"
            label="News Description*"
            value={values.NewsDescription}
            onChange={handleInputChange}
            errors={errors.NewsDescription}
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
  );
};

export default AnnouncementForm;
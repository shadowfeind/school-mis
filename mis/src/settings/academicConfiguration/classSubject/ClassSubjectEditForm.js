import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { updateSingleClassSubjectAction } from "./ClassSubjectActions";

const initialFormValues = {
  IDClassSubject: 1,
  IDAcademicSubject: 1,
  CreditHour: 3,
  FacultyLevel: 6,
  IsActive: true,
  Created_On: "2022-01-09T12:32:46.53",
  Updated_On: "2022-01-09T12:32:46.53",
};

const ClassSubjectEditForm = ({ singleClassSubject, setOpenPopupForm }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.CreditHour = fieldValues.CreditHour ? "" : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(updateSingleClassSubjectAction(values));
      setOpenPopupForm(false);
    }
  };

  useEffect(() => {
    if (singleClassSubject) {
      setValues({ ...singleClassSubject.dbModel });
    }
  }, [singleClassSubject]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            disabled
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="CreditHour"
            label="Credit Hour"
            onChange={handleInputChange}
            value={values.CreditHour}
            type="number"
            variant="outlined"
            required
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
          onClick={() => setOpenPopupForm(false)}
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

export default ClassSubjectEditForm;
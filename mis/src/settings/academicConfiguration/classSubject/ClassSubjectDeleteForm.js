import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import {
  deleteClassSubjectAction,
  updatedeleteClassSubjectAction,
} from "./ClassSubjectActions";

const initialFormValues = {
  IDClassSubject: 0,
  IDAcademicSubject: 0,
  CreditHour: 0,
  FacultyLevel: 0,
  IsActive: true,
  Created_On: "2022-01-09T12:32:46.53",
  Updated_On: "2022-01-09T12:32:46.53",
};

const ClassSubjectDeleteForm = ({ deleteClassSubject, setOpenDeletePopup }) => {
  const dispatch = useDispatch();
 
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteClassSubjectAction(values));
  };

  useEffect(() => {
    if (deleteClassSubject) {
      setValues({ ...deleteClassSubject });
    }
  }, [deleteClassSubject]);
  return (
    <Form onSubmit={handleDelete}>
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
            disabled
            name="CreditHour"
            label="Credit Hour"
            onChange={handleInputChange}
            value={values.CreditHour}
            type="number"
            variant="outlined"
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
          onClick={() => setOpenDeletePopup(false)}
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
          DELETE
        </Button>
      </div>
    </Form>
  );
};

export default ClassSubjectDeleteForm;

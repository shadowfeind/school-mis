import React from "react";
import { TableRow, TableCell, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const PrintAdminCardTableCollapse = ({ item }) => {
  const classes = useStyles();
  return (
    <>
      <TableRow>
        <TableCell>{item.StudentFullName}</TableCell>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.UniversityRegistrationNumber}</TableCell>
        <TableCell>{item.AcademicProgramName}/{item.FacultyName}</TableCell>
        <TableCell>{item.Section}</TableCell>
        <TableCell>{item.EventName}</TableCell>
        <TableCell>{item.Status}</TableCell>
      </TableRow>
    </>
  );
};

export default PrintAdminCardTableCollapse;

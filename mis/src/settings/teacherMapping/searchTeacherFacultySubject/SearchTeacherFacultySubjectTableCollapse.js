import React from "react";
import { Button, TableRow, TableCell, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
    button: {
      marginRight: "1px",
      padding: "5px",
      minWidth: "10px",
      fontSize: "12px",
    },
  });

  const SearchTeacherFacultySubjectTableCollapse = ({item,updateTeacherHandler})=>{
    const classes = useStyles();

    return (
        <TableRow>
          <TableCell>{item.IDHRTeacherFacultySubjectMappingHeader}</TableCell>
          <TableCell>{item.IDAcademicFacultySubjectLink}</TableCell>
          <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
          <TableCell>{item.Summary}</TableCell>
          <TableCell>{item.IsActive ? "Active" : "Not Active"}</TableCell>
          </TableRow>

    );
  };
  export default SearchTeacherFacultySubjectTableCollapse;
import React from "react";
import { Button, TableRow, TableCell, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";



const SearchTeacherFacultySubjectTableCollapse = ({
  item
}) => {

  return (
    <TableRow>
      <TableCell>{item.TeacherName}</TableCell>
      <TableCell>{item.IDYearFacultyLink}</TableCell>
      <TableCell>{item.IDAcademicFacultySubjectLink}</TableCell>
      <TableCell>{item.Level}</TableCell>
      <TableCell>
        {item.SubjectName} ({item.SubjectCode})
      </TableCell>
      <TableCell>{item.Section}</TableCell>
      <TableCell>{item.IDAcademicShift}</TableCell>
      <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
      <TableCell>{item.IsActive ? "Active" : "Not Active"}</TableCell>
    </TableRow>
  );
};
export default SearchTeacherFacultySubjectTableCollapse;

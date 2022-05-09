import React from "react";
import { Button, TableRow, TableCell, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";



const SearchTeacherFacultySubjectTableCollapse = ({
  item,classId,section,shift
}) => {

  const classNameToShow = classId?.filter( s => s.Key === item.Level)
  const sectionNameToShow = section?.filter( s => s.Key === item.Section)
  const shiftNameToShow = shift?.filter( s => s.Key === item.IDAcademicShift)

  return (
    <TableRow>
      <TableCell>{item.TeacherName}</TableCell>
      <TableCell>{item.IDYearFacultyLink}</TableCell>
      <TableCell>{classNameToShow?.length > 0 && classNameToShow[0].Value}</TableCell>
      <TableCell>
        {item.SubjectName} ({item.SubjectCode})
      </TableCell>
      <TableCell>{sectionNameToShow?.length > 0 && sectionNameToShow[0].Value}</TableCell>
      <TableCell>{shiftNameToShow?.length > 0 && shiftNameToShow[0].Value}</TableCell>
      <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
      <TableCell>{item.IsActive ? "Active" : "Not Active"}</TableCell>
    </TableRow>
  );
};
export default SearchTeacherFacultySubjectTableCollapse;

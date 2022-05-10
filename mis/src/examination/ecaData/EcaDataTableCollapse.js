import React, { useState } from "react";
import {
  Button,
  TableRow,
  TableCell,
  makeStyles,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";

const useStyles = makeStyles({
    button: {
      marginRight: "1px",
      padding: "5px",
      minWidth: "10px",
      fontSize: "12px",
    },
  });

  const EcaDataTableCollapse = ({item})=>{
    const classes = useStyles();

    return (
        <TableRow key={item.$id}>
          <TableCell>{item.RollNo}</TableCell>
          <TableCell>{item.FullName}</TableCell>
          <TableCell>{item.Division}</TableCell>
    </TableRow>
  );
  }

  export default EcaDataTableCollapse;
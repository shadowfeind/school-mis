import React from "react";
import { TableRow, TableCell, Button, makeStyles } from "@material-ui/core";
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

const TeacherNotificationTableCollapse = ({ item }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>
          {item.SenderID}
        </TableCell>
        <TableCell>{item.MessageDescription}</TableCell>
        <TableCell>{item.ReceiverID}</TableCell>
        <TableCell>{item.Created_On?.slice(0, 10)}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TeacherNotificationTableCollapse;

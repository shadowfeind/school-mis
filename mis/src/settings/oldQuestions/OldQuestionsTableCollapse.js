import React from "react";
import { Button, TableRow, TableCell, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { downloadOldQuestionsAction } from "./OldQuestionsActions";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const OldQuestionsTableCollapse = ({
  item,
  updateOldQuestions,
  classId,
  subject,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const downloadHandler = (id) => {
    dispatch(downloadOldQuestionsAction(id));
  };
  return (
    <TableRow>
      <TableCell>{item.OldQuestionName}</TableCell>
      <TableCell>{item.OldQuestionDescription}</TableCell>
      <TableCell>
        {item.FirstName} {item.LastName}
      </TableCell>
      <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
      <TableCell>{item.IsActive ? "active" : "notactive"}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => updateOldQuestions(item.Id)}
        >
          <EditIcon style={{ fontSize: 12 }} />
        </Button>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={() => downloadHandler(item.Id)}
        >
          <CloudDownloadIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OldQuestionsTableCollapse;

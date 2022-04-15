import React, { useEffect, useState } from "react";
import {
  withStyles,
  makeStyles,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import useCustomTable from "../customHooks/useCustomTable";
import { GET_ALL_LEAVE_REQUESTS_RESET, GET_LIST_LEAVE_REQUESTS_RESET } from "./DashboardConstants";
import { getAllLeaveRequestAction, getListLeaveRequestAction } from "./DashboardActions";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
  table: {
    margin: "10px 0",
    "& thead th": {
      fontWeight: "600",
      color: "#253053",
      backgroundColor: "#f7f7f7",
      fontSize: "12px",
      padding: "0.7vw",
    },
  },

}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#253053",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const tableHeader = [
  { id: "recieverName", label: "Reciever Name" },
  { id: "leaveDescription", label: "Leave Description" },
  { id: "fromDate_toDate", label: "FromDate to ToDate" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const DashboardLeaveRequest = () => {

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const { TblHead, TblPagination, tableDataAfterPagingAndSorting } =
    useCustomTable(tableData, tableHeader, filterFn);

    const dispatch = useDispatch();
  const classes = useStyles();

  const { allLeaveRequest, error,loading } = useSelector(
    (state) => state.getAllLeaveRequest
  );

  const { listLeaveRequest, listLeaveRequestError } = useSelector(
    (state) => state.getListLeaveRequest
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_LEAVE_REQUESTS_RESET });
  }

  if (listLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: listLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_LIST_LEAVE_REQUESTS_RESET });
  }

  useEffect(() => {
    if (!listLeaveRequest) {
      dispatch(getListLeaveRequestAction());
    }
    if (listLeaveRequest) {
      setTableData(listLeaveRequest.dbModelLst);
    }
  }, [dispatch, listLeaveRequest]);



  return (
    <>
      <Table className={classes.table}>
        <TblHead />

        <TableBody>
          {tableDataAfterPagingAndSorting().map((s) => (
            <StyledTableRow key={s.id}>
              <StyledTableCell component="th" scope="row">
                {s.FirsName}{s.MiddleName}{s.LastName}
              </StyledTableCell>
              <StyledTableCell align="left">{s.LeaveDecription}</StyledTableCell>
              <StyledTableCell align="left">{s.FromDate?.slice(0,10)} /<div>{s.ToDate?.slice(0,10)}</div></StyledTableCell>
              <StyledTableCell align="left">
                {s.Status}
              </StyledTableCell>
              <StyledTableCell>
              <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={() => updateCollegeHandler(item.IDHREmployeeCategoryRole)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            // onClick={() => deleteCollegeHandler(item.IDHREmployeeCategoryRole)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
          variant="contained"
          color="default"
          className={classes.button}
          // onClick={() => downloadHandler(item.Id)}
        >
          <CloudDownloadIcon style={{ fontSize: 12 }} />
        </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TblPagination />
    </>
  );
};

export default DashboardLeaveRequest;

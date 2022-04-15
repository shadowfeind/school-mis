import React, { useEffect, useState } from "react";
import {
  withStyles,
  makeStyles,
  Button,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import useCustomTable from "../customHooks/useCustomTable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { GET_LIST_LEAVE_REQUESTS_RESET } from "./DashboardConstants";
import { getListLeaveRequestAction } from "./DashboardActions";

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
  { id: "recieverName", label: "Sender Name" },
  { id: "leaveDescription", label: "Leave Description" },
  { id: "fromDate_toDate", label: "FromDate to ToDate" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const DashboardLeaveApprove = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const { TblHead, TblPagination, tableDataAfterPagingAndSorting } =
    useCustomTable(tableData, tableHeader, filterFn);

  const classes = useStyles();
  const dispatch = useDispatch();

  const { listLeaveRequest, listLeaveRequestError } = useSelector(
    (state) => state.getListLeaveRequest
  );

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
      setTableData(listLeaveRequest.dbModelReceiverLst);
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
                {s.FirsName}
                {s.MiddleName}
                {s.LastName}
              </StyledTableCell>
              <StyledTableCell align="left">
                {s.LeaveDecription}
              </StyledTableCell>
              <StyledTableCell align="left">
                {s.FromDate?.slice(0, 10)} /<div>{s.ToDate?.slice(0, 10)}</div>
              </StyledTableCell>
              <StyledTableCell align="left">{s.Status}</StyledTableCell>
              <StyledTableCell align="left">
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

export default DashboardLeaveApprove;

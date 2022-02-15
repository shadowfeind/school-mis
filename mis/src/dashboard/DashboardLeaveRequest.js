import React, { useEffect, useState } from "react";
import {
  withStyles,
  makeStyles,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import useCustomTable from "../customHooks/useCustomTable";

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "10px 0",
    "& thead th": {
      fontWeight: "600",
      color: "#fff",
      backgroundColor: "#253053",
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const tableHeader = [
  { id: "date", label: "Leave Date" },
  { id: "description", label: "Description" },
  { id: "actions", label: "Approved", disableSorting: true },
];

const data = [
  { id: 1, date: "01-02-2021", description: "Very tired", approved: true },
  { id: 2, date: "01-02-2021", description: "Sick Leave", approved: true },
  { id: 3, date: "01-02-2021", description: "Headache", approved: false },
  { id: 4, date: "01-02-2021", description: "Stomach ache", approved: true },
  { id: 5, date: "01-02-2021", description: "COVID", approved: true },
  { id: 6, date: "01-02-2021", description: "Injured", approved: true },
  { id: 7, date: "01-02-2021", description: "Very tired", approved: false },
  { id: 8, date: "01-02-2021", description: "Very tired", approved: true },
  { id: 9, date: "01-02-2021", description: "Sick Leave", approved: true },
  { id: 10, date: "01-02-2021", description: "Headache", approved: true },
  { id: 11, date: "EN", description: "Stomach ache", approved: false },
  { id: 12, date: "01-02-2021", description: "COVID", approved: true },
  { id: 13, date: "01-02-2021", description: "Injured", approved: true },
  { id: 14, date: "01-02-2021", description: "Very tired", approved: true },
];

const DashboardLeaveRequest = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const { TblHead, TblPagination, tableDataAfterPagingAndSorting } =
    useCustomTable(tableData, tableHeader, filterFn);

  const classes = useStyles();
  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);
  return (
    <>
      <Table className={classes.table}>
        <TblHead />

        <TableBody>
          {tableDataAfterPagingAndSorting().map((s) => (
            <StyledTableRow key={s.id}>
              <StyledTableCell component="th" scope="row">
                {s.date}
              </StyledTableCell>

              <StyledTableCell align="left">{s.description}</StyledTableCell>
              <StyledTableCell align="left">
                {s.approved ? (
                  <span
                    style={{
                      backgroundColor: "#ddfaff",
                      color: "#4f7b7f",
                      fontSize: "10px",
                      padding: "5px 10px",
                    }}
                  >
                    Approved
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: "#ffd1d1",
                      color: "#d14343",
                      fontSize: "10px",
                      padding: "5px 10px",
                    }}
                  >
                    Declined
                  </span>
                )}
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

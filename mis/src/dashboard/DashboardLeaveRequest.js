import React, { useEffect, useState } from "react";
import {
  withStyles,
  makeStyles,
  Card,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@material-ui/core";
import useCustomTable from "../customHooks/useCustomTable";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
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
  { id: "name", label: "Student Name" },
  { id: "class", label: "Class" },
  { id: "description", label: "Description" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const data = [
  { id: 1, name: "Suresh M. Sanu", class: "NINE", description: "Very tired" },
  { id: 2, name: "Kiran Rai", class: "TWO", description: "Sick Leave" },
  { id: 3, name: "Amir Karmacharya", class: "NINE", description: "Headache" },
  { id: 4, name: "Ram Lal", class: "EN", description: "Stomach ache" },
  { id: 5, name: "Pappu Singh", class: "EIGHT", description: "COVID" },
  { id: 6, name: "Gita Maharjan", class: "SEVEN", description: "Injured" },
  { id: 7, name: "Angelina Jolie", class: "FIVE", description: "Very tired" },
  { id: 8, name: "Suresh M. Sanu", class: "NINE", description: "Very tired" },
  { id: 9, name: "Kiran Rai", class: "TWO", description: "Sick Leave" },
  { id: 10, name: "Amir Karmacharya", class: "NINE", description: "Headache" },
  { id: 11, name: "Ram Lal", class: "EN", description: "Stomach ache" },
  { id: 12, name: "Pappu Singh", class: "EIGHT", description: "COVID" },
  { id: 13, name: "Gita Maharjan", class: "SEVEN", description: "Injured" },
  { id: 14, name: "Angelina Jolie", class: "FIVE", description: "Very tired" },
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
    <Card className={classes.cardStyle}>
      <h4 style={{ margin: "0" }}>Leave Request</h4>
      <Table className={classes.table}>
        <TblHead />

        <TableBody>
          {tableDataAfterPagingAndSorting().map((s) => (
            <StyledTableRow key={s.id}>
              <StyledTableCell component="th" scope="row">
                {s.name}
              </StyledTableCell>
              <StyledTableCell align="left">{s.class}</StyledTableCell>
              <StyledTableCell align="left">{s.description}</StyledTableCell>
              <StyledTableCell align="left">
                <span
                  style={{
                    backgroundColor: "#ffd1d1",
                    color: "#d14343",
                    fontSize: "10px",
                    padding: "5px 10px",
                  }}
                >
                  Approve
                </span>
                <span
                  style={{
                    backgroundColor: "#ddfaff",
                    color: "#4f7b7f",
                    fontSize: "10px",
                    padding: "5px 10px",
                  }}
                >
                  Decline
                </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TblPagination />
    </Card>
  );
};

export default DashboardLeaveRequest;

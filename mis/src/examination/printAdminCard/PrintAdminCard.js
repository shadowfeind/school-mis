import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getActiveStudentsForAdmitCardDataAction,
  getInitialStudentRegistrationDataAction,
  printStudentsAdmitCardDataAction,
  searchStudentsForAdmitCardDataAction,
} from "./PrintAdminCardActions";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import { GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET } from "./PrintAdminCardConstants";
import PrintAdminCardTableCollapse from "./PrintAdminCardTableCollapse";
import DatePickerControl from "../../components/controls/DatePickerControl";
import PrintAdminCardPrint from "./PrintAdminCardPrint";
import { useReactToPrint } from "react-to-print";
import "./customPrint.css";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  customInput: {
    minWidth: "200px",
  },
}));

const test = [{ Key: "", Value: "" }];

const tableHeader = [
  { id: "StudentFullName", label: "Full Name" },
  { id: "RollNo", label: "Roll No" },
  { id: "UniversityRegistrationNumber", label: "Symbol No." },
  { id: "AcademicProgramName", label: "Program" },
  { id: "FacultyName", label: "Faculty" },
  { id: "Section", label: "Section" },
  { id: "EventName", label: "Event Name" },
  { id: "Status", label: "Status" },
];
/*
 * same api as ExamMarkEntry to get Events
 */
const PrintAdminCard = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [event, setEvent] = useState("");
  const [student, setStudent] = useState(0);
  const [date, setDate] = useState("2022-01-28");
  const [dateValue, setDateValue] = useState("2022-01-28");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
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

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.FullName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { admitCardInitialData } = useSelector(
    (state) => state.getInitialAdmitCardData
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { searchStudentsForAdmitCard,loading } = useSelector(
    (state) => state.searchStudentsForAdmitCardData
  );

  const {
    activeStudentsForAdmitCard,
    success: activeStudentsForAdmitCardSuccess,
  } = useSelector((state) => state.getActiveStudentsForAdmitCardData);

  const { printStudentsAdmitCard ,loading:loadingBulk} = useSelector(
    (state) => state.printStudentsAdmitCardData
  );

  if (getEventSuccess) {
    setDdlEvent(allEvents);
    dispatch({ type: GET_EVENT_RESET });
  }

  if (activeStudentsForAdmitCardSuccess) {
    setDdlStudent(activeStudentsForAdmitCard);
    dispatch({ type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (!admitCardInitialData) {
      dispatch(getInitialStudentRegistrationDataAction());
    }
    if (admitCardInitialData) {
      setProgramDdl(
        admitCardInitialData.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(admitCardInitialData.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        admitCardInitialData.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(admitCardInitialData.searchFilterModel.ddlAcademicShift);
      setDdlSection(admitCardInitialData.searchFilterModel.ddlSection);
    }
  }, [admitCardInitialData, dispatch]);

  useEffect(() => {
    if (searchStudentsForAdmitCard) {
      setTableData(searchStudentsForAdmitCard.dbModelLst);
    }
  }, [searchStudentsForAdmitCard]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleShift = (value) => {
    setShift(value);

    if ((acaYear, programValue, classId)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          value
        )
      );
    }
  };

  const handleProgramValue = (value) => {
    setProgramValue(value);
    if ((acaYear, classId, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(value, acaYear, classId, shift)
      );
    }
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if (classId) {
      dispatch(getEventAction(value, programValue, classId));
    }

    if ((programValue, classId, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          value,
          programValue,
          classId,
          shift
        )
      );
    }
    if(event){
      setEvent("")
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    if (acaYear) {
      dispatch(getEventAction(acaYear, programValue, value));
    }

    if ((acaYear, programValue, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          value,
          shift
        )
      );
    }
    if(event){
      setEvent("")
    }
  };

  const handleStudentSearch = () => {
    if (validate()) {
      dispatch(
        searchStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student
        )
      );
    }
  };

  const handleDate = (date) => {
    if (date) {
      setDateValue(date);
      const newDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
      setDate(newDate);
    }
  };

  const handleBulkPrint = () => {
    if (validate()) {
      dispatch(
        printStudentsAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date
        )
      );
      setOpenPopup(true);
    }
  };

  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => handleYearChange(e.target.value)}
                options={academicYearDdl}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => handleProgramValue(e.target.value)}
                options={programDdl}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => handleShift(e.target.value)}
                options={ddlShift}
                errors={errors.shift1}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection}
                errors={errors.section}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={errors.event}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Student"
                label="Student"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                options={ddlStudent ? ddlStudent : test}
                errors={errors.student}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="DOJ"
                label="Pick Exam Date"
                value={dateValue}
                onChange={(e) => handleDate(e.target.value)}
                errors={errors.date}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkPrint}
              >
                BULK PRINT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleStudentSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Student"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
        {searchStudentsForAdmitCard && (
          <TableContainer className={classes.table}>
            <TblHead />
            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <PrintAdminCardTableCollapse item={item} key={item.$id} />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {searchStudentsForAdmitCard && <TblPagination />}
        </>
        )}
      </CustomContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
      {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
        <PrintAdminCardPrint
          students={printStudentsAdmitCard && printStudentsAdmitCard.dbModelLst}
          imagePath={
            printStudentsAdmitCard && printStudentsAdmitCard.ImagePathLst
          }
          classname={printStudentsAdmitCard && printStudentsAdmitCard.ClassName}
          examDate={printStudentsAdmitCard && printStudentsAdmitCard.examDate}
          print={printPdf}
          componentRef={componentRef}
        />
        </>
        )}
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default PrintAdminCard;

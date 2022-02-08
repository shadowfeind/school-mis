import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  GET_ALL_OLD_QUESTIONS_RESET,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_RESET,
  GET_SUBJECT_OF_OLD_QUESTIONS_RESET,
} from "./OldQuestionsConstants";
import {
  getAllOldQuestionsAction,
  getListOldQuestionsAction,
  getSingleCreateOldQuestionsAction,
  getSubjectOldQuestionsAction,
} from "./OldQuestionsActions";
import OldQuestionsTableCollapse from "./OldQuestionsTableCollapse";
import OldQuestionsForm from "./OldQuestionsForm";

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

const tableHeader = [
  { id: "Name", label: "Name" },
  { id: "Description", label: "Description" },
  { id: "PostedBy", label: "Posted By" },
  { id: "PostedDate", label: "Posted Date" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const OldQuestions = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [classId, setClassId] = useState("");
  const [ddlFacultySubject, setDdlFacultySubject] = useState([]);
  const [facultySubject, setFacultySubject] = useState("");
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState([]);
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
  const classes = useStyles();
  const dispatch = useDispatch();

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
            x.Prefix.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { allOldQuestions, error: allOldQuestionsError } = useSelector(
    (state) => state.getAllOldQuestions
  );
  const { subjectOldQuestions, error: subjectOldQuestionsError } = useSelector(
    (state) => state.getSubjectOldQuestions
  );

  const { singleCreateOldQuestions } = useSelector(
    (state) => state.getSingleCreateOldQuestions
  );

  const { listOldQuestions } = useSelector(
    (state) => state.getListOldQuestions
  );

  if (allOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: allOldQuestionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OLD_QUESTIONS_RESET });
  }
  if (subjectOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: subjectOldQuestionsError,
      type: "error",
    });
    dispatch({ type: GET_SUBJECT_OF_OLD_QUESTIONS_RESET });
  }
  useEffect(() => {
    if (!allOldQuestions) {
      dispatch(getAllOldQuestionsAction());
    }
    if (allOldQuestions) {
      setDdlClass(allOldQuestions.searchFilterModel.ddlClass);
    }
  }, [dispatch, allOldQuestions]);

  useEffect(() => {
    if (listOldQuestions) {
      setTableData(listOldQuestions.dbModelModelLst);
    }
  }, [listOldQuestions]);

  useEffect(() => {
    if (subjectOldQuestions) {
      setDdlFacultySubject([...subjectOldQuestions]);
    }
  }, [subjectOldQuestions]);

  const validate = () => {
    let temp = {};
    temp.classId = !classId ? "This feild is required" : "";
    temp.facultySubject = !facultySubject ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListOldQuestionsAction(classId, facultySubject));
    }
  };

  const handleCreate = () => {
    if(validate()){
    dispatch(getSingleCreateOldQuestionsAction(classId, facultySubject));
    setOpenPopup(true);
    dispatch({ type: GET_SINGLE_TO_CREATE_OLD_QUESTIONS_RESET });
  };
};

  const handleClassIdChange = (value) => {
    setClassId(value);
    dispatch(getSubjectOldQuestionsAction(value));
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="classes"
                label="Class"
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
                value={classId}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="subject"
                label="Subject"
                value={facultySubject}
                onChange={(e) => setFacultySubject(e.target.value)}
                options={ddlFacultySubject}
                errors={errors.facultySubject}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreate}
                type="submit"
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
                type="submit"
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
            label="Search Academic Faculty"
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
        {listOldQuestions && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <OldQuestionsTableCollapse
                  item={item}
                  key={item.$id}
                //   updateCounterConfig={updateCounterConfig}
                //   classId={
                //     listOldQuestions && listOldQuestions.searchFilterModel.level
                //   }
                //   subject={
                //     listOldQuestions &&
                //     listOldQuestions.searchFilterModel.idSubject
                //   }
                  //   deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}
        {listOldQuestions && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Old Questions Form"
      >
        <OldQuestionsForm
        //   singleStudent={singleStudentRegistration && singleStudentRegistration}
        singleCreateOldQuestions={singleCreateOldQuestions}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default OldQuestions;

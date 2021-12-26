import { combineReducers } from "redux";
import {
  createSchoolSettingsReducer,
  getAllSchoolSettings,
  getSingleSchoolSettingsReducer,
  updateSingleSchoolSettingsReducer,
} from "./settings/schoolConfiguration/schoolSettings/SchoolSettingsReducers";
import {
  createPositionReducer,
  getAllPosition,
  getSinglePositionReducer,
  updateSinglePositionReducer,
} from "./settings/schoolConfiguration/position/PositionReducers";
import {
  createEmployeeTypeReducer,
  getAllEmployeeType,
  getSingleEmployeeTypeReducer,
  updateSingleEmployeeTypeReducer,
} from "./settings/schoolConfiguration/employeeType/EmployeeTypeReducers";
import {
  createEmployeeCategoryRoleReducer,
  getAllEmployeeCategoryRole,
  getSingleEmployeeCategoryRoleReducer,
  updateSingleEmployeeCategoryRoleReducer,
} from "./settings/schoolConfiguration/employeeCategoryRole/EmployeeCategoryRoleReduces";
import {
  createHolidayReducer,
  getAllHoliday,
  getSingleHolidayReducer,
  updateSingleHolidayReducer,
} from "./settings/schoolConfiguration/holiday/HolidayReducers";
import {
  createEmployeeReducer,
  getAllEmployee,
  getAllEmployeeCreateReducer,
  getSingleEmployeeReducer,
  updateSingleEmployeeReducer,
} from "./settings/employeeManagement/employee/EmployeeReducers";
import {
  createRoleReducer,
  getAllRoles,
  getSingleRoleReducer,
  updateSingleRoleReducer,
} from "./settings/employeeManagement/role/RoleReducers";
import {
  createAcademicClassReducer,
  getAllAcademicClass,
  getSingleAcademicClassReducer,
  updateSingleAcademicClassReducer,
} from "./settings/academicConfiguration/academicClass/AcademicClassReducers";
import {
  createAcademicSectionReducer,
  getAllAcademicSection,
  getSingleAcademicSectionReducer,
  updateSingleAcademicSectionReducer,
} from "./settings/academicConfiguration/academicSection/AcademicSectionReducers";
import {
  createSchoolBoardReducer,
  getAllSchoolBoard,
  getSingleSchoolBoardReducer,
  updateSingleSchoolBoardReducer,
} from "./settings/academicConfiguration/schoolBoard/SchoolBoardReducers";
import {
  createAcademicProgramReducer,
  getAcademicProgramOptionReducer,
  getAllAcademicProgram,
  getSingleAcademicProgramReducer,
  updateSingleAcademicProgramReducer,
} from "./settings/academicConfiguration/academicProgram/AcademicProgramReducers";
import {
  createAcademicFacultyReducer,
  getAcademicFacultyOptionReducer,
  getAllAcademicFaculty,
  getSingleAcademicFacultyReducer,
} from "./settings/academicConfiguration/academicFaculty/AcademicFacultyReducers";
import {
  createAcademicYearReducer,
  getAcademicYearOptionReducer,
  getAllAcademicYear,
  getSingleAcademicYearReducer,
  updateSingleAcademicYearReducer,
} from "./settings/academicConfiguration/academicYear/AcademicYearReducers";
import {
  createAcademicYearCalendarReducer,
  getAllAcademicYearCalendar,
  getAcademicYearCalendarProgramReducer,
  getSingleAcademicYearCalendarReducer,
  updateSingleAcademicYearCalendarReducer,
  createAcademicYearCalendarPostReducer,
  academicYearCalendarSearchReducer,
} from "./settings/academicConfiguration/academicYearCalendar/AcademicYearCalendarReducers";
import {
  createAcademicSubjectReducer,
  getAllAcademicSubject,
  getSingleAcademicSubjectReducer,
  updateSingleAcademicSubjectReducer,
} from "./settings/academicConfiguration/academicSubject/AcademicSubjectReducers";
import {
  assignFacultySubjectEditPostReducer,
  assignFacultySubjectEditReducer,
  assignFacultySubjectPostReducer,
  getAllAssignFacultySubjectReducer,
  getAssignFacultySubjectOptionReducer,
  getListAssignFacultySubjectReducer,
  getSingleassignFacultySubjectReducer,
} from "./settings/academicConfiguration/assignFacultySubject/AssignFacultySubjectReducers";
import { getAllStudentProfile } from "./settings/studentManagement/studentProfile/StudentProfileReducers";
import {
  getAllReassociateStudentsReducer,
  getReassociateStudentsLevelupPostReducer,
  getReassociateStudentsLevelupReducer,
  getReassociateStudentsListsReducer,
} from "./settings/studentManagement/reassociateStudent/ReassociateStudentReducers";

export const reducers = combineReducers({
  schoolSettings: getAllSchoolSettings,
  createSchoolSettings: createSchoolSettingsReducer,
  getSingleSchoolSettings: getSingleSchoolSettingsReducer,
  updateSingleSchoolSettings: updateSingleSchoolSettingsReducer,
  position: getAllPosition,
  createPosition: createPositionReducer,
  getSinglePosition: getSinglePositionReducer,
  updateSinglePosition: updateSinglePositionReducer,
  employeeType: getAllEmployeeType,
  createEmployeeType: createEmployeeTypeReducer,
  getSingleEmployeeType: getSingleEmployeeTypeReducer,
  updateSingleEmployeeType: updateSingleEmployeeTypeReducer,
  employeeCategoryRole: getAllEmployeeCategoryRole,
  createEmployeeCategoryRole: createEmployeeCategoryRoleReducer,
  getSingleEmployeeCategoryRole: getSingleEmployeeCategoryRoleReducer,
  updateSingleEmployeeCategoryRole: updateSingleEmployeeCategoryRoleReducer,
  holiday: getAllHoliday,
  createHoliday: createHolidayReducer,
  getSingleHoliday: getSingleHolidayReducer,
  updateSingleHoliday: updateSingleHolidayReducer,
  employee: getAllEmployee,
  getAllEmployeeCreate: getAllEmployeeCreateReducer,
  createEmployee: createEmployeeReducer,
  getSingleEmployee: getSingleEmployeeReducer,
  updateSingleEmployee: updateSingleEmployeeReducer,
  role: getAllRoles,
  createRole: createRoleReducer,
  getSingleRole: getSingleRoleReducer,
  updateSingleRole: updateSingleRoleReducer,
  academicClass: getAllAcademicClass,
  createAcademicClass: createAcademicClassReducer,
  getSingleAcademicClass: getSingleAcademicClassReducer,
  updateSingleAcademicClass: updateSingleAcademicClassReducer,
  academicSection: getAllAcademicSection,
  createAcademicSection: createAcademicSectionReducer,
  getSingleAcademicSection: getSingleAcademicSectionReducer,
  updateSingleAcademicSection: updateSingleAcademicSectionReducer,
  schoolBoard: getAllSchoolBoard,
  createSchoolBoard: createSchoolBoardReducer,
  getSingleSchoolBoard: getSingleSchoolBoardReducer,
  updateSingleSchoolBoard: updateSingleSchoolBoardReducer,
  academicProgram: getAllAcademicProgram,
  createAcademicProgram: createAcademicProgramReducer,
  getAcademicProgramOption: getAcademicProgramOptionReducer,
  getSingleAcademicProgram: getSingleAcademicProgramReducer,
  updateSingleAcademicProgram: updateSingleAcademicProgramReducer,
  academicFaculty: getAllAcademicFaculty,
  createAcademicFaculty: createAcademicFacultyReducer,
  getAcademicFacultyOption: getAcademicFacultyOptionReducer,
  getSingleAcademicFaculty: getSingleAcademicFacultyReducer,
  academicYear: getAllAcademicYear,
  createAcademicYear: createAcademicYearReducer,
  getAcademicYearOption: getAcademicYearOptionReducer,
  getSingleAcademicYear: getSingleAcademicYearReducer,
  updateSingleAcademicYear: updateSingleAcademicYearReducer,
  academicYearCalendar: getAllAcademicYearCalendar,
  createAcademicYearCalendar: createAcademicYearCalendarReducer,
  createAcademicYearCalendarPost: createAcademicYearCalendarPostReducer,
  academicYearCalendarSearch: academicYearCalendarSearchReducer,
  getSingleAcademicYearCalendar: getSingleAcademicYearCalendarReducer,
  updateSingleAcademicYearCalendar: updateSingleAcademicYearCalendarReducer,
  getAcademicYearCalendarProgram: getAcademicYearCalendarProgramReducer,
  academicSubject: getAllAcademicSubject,
  getSingleAcademicSubject: getSingleAcademicSubjectReducer,
  createAcademicSubject: createAcademicSubjectReducer,
  updateSingleAcademicSubject: updateSingleAcademicSubjectReducer,
  getAllAssignFacultySubject: getAllAssignFacultySubjectReducer,
  getAssignFacultySubjectOption: getAssignFacultySubjectOptionReducer,
  getListAssignFacultySubject: getListAssignFacultySubjectReducer,
  assignFacultySubjectPost: assignFacultySubjectPostReducer,
  getSingleassignFacultySubject: getSingleassignFacultySubjectReducer,
  assignFacultySubjectEdit: assignFacultySubjectEditReducer,
  assignFacultySubjectEditPost: assignFacultySubjectEditPostReducer,
  studentProfile: getAllStudentProfile,
  getAllReassociateStudents: getAllReassociateStudentsReducer,
  getReassociateStudentsLists: getReassociateStudentsListsReducer,
  getReassociateStudentsLevelup: getReassociateStudentsLevelupReducer,
  getReassociateStudentsLevelupPost: getReassociateStudentsLevelupPostReducer,
});

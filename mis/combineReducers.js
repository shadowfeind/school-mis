import { combineReducers } from "redux";
import { getAllSchoolSettings } from "./src/settings/schoolConfiguration/schoolSettings/SchoolSettingsReducers";
import {
  createPositionReducer,
  getAllPosition,
  getSinglePositionReducer,
  updateSinglePositionReducer,
} from "./src/settings/schoolConfiguration/position/PositionReducers";
import {
  createEmployeeTypeReducer,
  getAllEmployeeType,
  getSingleEmployeeTypeReducer,
  updateSingleEmployeeTypeReducer,
} from "./src/settings/schoolConfiguration/employeeType/EmployeeTypeReducers";
import {
  createEmployeeCategoryRoleReducer,
  getAllEmployeeCategoryRole,
  getSingleEmployeeCategoryRoleReducer,
  updateSingleEmployeeCategoryRoleReducer,
} from "./src/settings/schoolConfiguration/employeeCategoryRole/EmployeeCategoryRoleReduces";
import {
  createHolidayReducer,
  getAllHoliday,
  getSingleHolidayReducer,
  updateSingleHolidayReducer,
} from "./src/settings/schoolConfiguration/holiday/HolidayReducers";
import { getAllEmployee } from "./src/settings/employeeManagement/employee/EmployeeReducers";
import { getAllRoles } from "./src/settings/employeeManagement/role/RoleReducers";
import { getAllAcademicClass } from "./src/settings/academicConfiguration/academicClass/AcademicClassReducers";
import { getAllAcademicSection } from "./src/settings/academicConfiguration/academicSection/AcademicSectionReducers";

export const reducers = combineReducers({
  schoolSettings: getAllSchoolSettings,
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
  role: getAllRoles,
  academicClass: getAllAcademicClass,
  academicSection: getAllAcademicSection,
});

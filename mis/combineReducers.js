import { combineReducers } from "redux";
import { getAllSchoolSettings } from "./src/settings/schoolConfiguration/schoolSettings/SchoolSettingsReducers";
import {
  createPositionReducer,
  getAllPosition,
  getSinglePositionReducer,
  updateSinglePositionReducer,
} from "./src/settings/schoolConfiguration/position/PositionReducers";
import { getAllEmployeeType } from "./src/settings/schoolConfiguration/employeeType/EmployeeTypeReducers";
import { getAllEmployeeCategoryRole } from "./src/settings/schoolConfiguration/employeeCategoryRole/EmployeeCategoryRoleReduces";
import { getAllHoliday } from "./src/settings/schoolConfiguration/holiday/HolidayReducers";
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
  employeeCategoryRole: getAllEmployeeCategoryRole,
  holiday: getAllHoliday,
  employee: getAllEmployee,
  role: getAllRoles,
  academicClass: getAllAcademicClass,
  academicSection: getAllAcademicSection,
});

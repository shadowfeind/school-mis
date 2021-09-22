import { combineReducers } from "redux";
import { getAllSchoolSettings } from "./src/settings/schoolConfiguration/schoolSettings/SchoolSettingsReducers";
import { getAllPosition } from "./src/settings/schoolConfiguration/position/PositionReducers";
import { getAllEmployeeType } from "./src/settings/schoolConfiguration/employeeType/EmployeeTypeReducers";
import { getAllEmployeeCategoryRole } from "./src/settings/schoolConfiguration/employeeCategoryRole/EmployeeCategoryRoleReduces";
import { getAllHoliday } from "./src/settings/schoolConfiguration/holiday/HolidayReducers";
import { getAllEmployee } from "./src/settings/employeeManagement/employee/EmployeeReducers";
import { getAllRoles } from "./src/settings/employeeManagement/role/RoleReducers";

export const reducers = combineReducers({
  schoolSettings: getAllSchoolSettings,
  position: getAllPosition,
  employeeType: getAllEmployeeType,
  employeeCategoryRole: getAllEmployeeCategoryRole,
  holiday: getAllHoliday,
  employee: getAllEmployee,
  role: getAllRoles,
});

import { combineReducers } from "redux";
import { getAllSchoolSettings } from "./src/settings/schoolSettings.js/SchoolSettingsReducers";
import { getAllPosition } from "./src/settings/position/PositionReducers";
import { getAllEmployeeType } from "./src/settings/employeeType/EmployeeTypeReducers";
import { getAllEmployeeCategoryRole } from "./src/settings/employeeCategoryRole/EmployeeCategoryRoleReduces";

export const reducers = combineReducers({
  schoolSettings: getAllSchoolSettings,
  position: getAllPosition,
  employeeType: getAllEmployeeType,
  employeeCategoryRole: getAllEmployeeCategoryRole,
});

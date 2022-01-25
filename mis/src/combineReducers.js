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
  getResetPasswordDataSingleEmployeeReducer,
  getSingleEmployeeReducer,
  resetPasswordForSingleEmployeeReducer,
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
  assignFacultySubjectGenerateReducer,
  assignFacultySubjectPostReducer,
  getAllAssignFacultySubjectReducer,
  getAssignFacultySubjectOptionReducer,
  getListAssignFacultySubjectReducer,
  getSingleassignFacultySubjectReducer,
} from "./settings/academicConfiguration/assignFacultySubject/AssignFacultySubjectReducers";
import {
  getAllStudentProfile,
  getListStudentProfileReducer,
  getSingleStudentProfileDetailsReducer,
  getSingleStudentProfileEditDataReducer,
  getSingleStudentProfilePasswordresetDataReducer,
  resetSingleStudentProfilePasswordReducer,
  updateSingleStudentProfileReducer,
} from "./settings/studentManagement/studentProfile/StudentProfileReducers";
import {
  getAllReassociateStudentsReducer,
  getReassociateStudentsLevelupPostReducer,
  getReassociateStudentsLevelupReducer,
  getReassociateStudentsListsReducer,
} from "./settings/studentManagement/reassociateStudent/ReassociateStudentReducers";

//examination reducers link start
import {
  createAcademicGradingReducer,
  getAllAcademicGradingReducer,
  getSingleAcademicGradingforEditReducer,
  getSingleAcademicGradingReducer,
  updateSingleAcademicGradingReducer,
} from "./examination/academicGrading/AcademicGradingReducers";
import {
  createExamDivisionReducer,
  getAllExamDivisionReducer,
  getSingleExamDivisionEditReducer,
  getSingleExamDivisionReducer,
  updateSingleExamDivisionReducer,
} from "./examination/examDivision/ExamDivisionReducers";
import {
  getBulkExamApprovalSearchDataReducer,
  getExamApprovalScheduleHeaderReducer,
  getExamApprovalSearchDataReducer,
  getInitialExamApprovalDataReducer,
  postBulkExamApprovalReducer,
} from "./examination/examMarkApproval/ExamMarkApprovalReducers";
import {
  getAllAcademicStudentExamdataReducer,
  getEventReducer,
  getEventScheduleReducer,
  getExamEntryBulkReducer,
  getExamEntrySearchDataReducer,
} from "./examination/examMarkEntry/ExamMarkEntryReducers";
import {
  getEventForExamMarkReducer,
  getExamLedgerHeaderReducer,
  getExamResultListReducer,
  getInitialExamResultDataReducer,
  getInitialExamResultStudentOptionsReducer,
  printExamResultReducer,
} from "./examination/examResult/ExamResultReducers";
import {
  getAllExamScheduleInitialDataReducer,
  getExamScheduleListReducer,
} from "./examination/examSchedule/ExamScheduleReducers";
import {
  getAllGeneratePublishReducer,
  getAllGeneratePublishResultReducer,
  getAllGenerateReducer,
} from "./examination/generatePublishResult/GeneratePublishResultReducers";
import {
  getBulkLevelTestDataReducer,
  getInitialLevelTestDataReducer,
  postBulkLevelTestDataReducer,
} from "./examination/levelTest/LevelTestReducers";
import {
  getActiveStudentsForAdmitCardDataReducer,
  getInitialAdmitCardDataReducer,
  printStudentsAdmitCardDataReducer,
  searchStudentsForAdmitCardDataReducer,
} from "./examination/printAdminCard/PrintAdminCardReducers";
import {
  getAllStudentAttendanceInitialDataReducer,
  getAllStudentAttendanceReducer,
  getBulkStudentAttendanceReducer,
  postBulkStudentAttendanceReducer,
} from "./examination/studentAttendance/StudentAttendanceReducers";
import {
  createSingleStudentRegistrationReducer,
  getCreateSingleStudentRegistrationDataReducer,
  getInitialStudentRegistrationDataReducer,
  getSingleStudentRegistrationDataReducer,
  getStudentRegistrationDataReducer,
  singleStudentRegistrationCreateReducer,
  singleStudentRegistrationEditReducer,
} from "./registration/studentRegistration/StudentRegistrationReducers";
import { navLinkReducer } from "./routesConfig/Route";
import {
  counterConfigCreateReducer,
  CounterConfigEditReducer,
  getCounterConfigInitialDataForCreateReducer,
  getCounterConfigInitialDataForEditReducer,
  getCounterConfigInitialDataReducer,
  getCounterConfigListReducer,
} from "./registration/counterConfiguration/CounterConfigurationReducers";
import {
  createSingleAdmissionConfigReducer,
  getAdmissionConfigInitialDataReducer,
  getAdmissionConfigListDataReducer,
  getCreateSingleAdmissionConfigReducer,
  getSingleAdmissionConfigReducer,
  updateSingleAdmissionConfigReducer,
} from "./registration/admissionConfiguration/AdmissionConfigurationReducers";
import {
  getActiveStudentsForStudentIdCardDataReducer,
  getInitialStudentIdCardDataReducer,
} from "./settings/studentManagement/studentIdCard/StudentIdCardReducers";
import {
  createSingleTeacherFacSubReducer,
  createTeacherFacSubInitDataReducer,
  getAllTeacherFacSubInitialDataReducer,
  getAllTeacherFacSubListDataReducer,
  getSingleTeacherFacSubDataReducer,
  singleTeacherFacSubEditReducer,
} from "./settings/teacherMapping/teacherFacultySubject/TeacherFacultySubjectReducers";
import {
  getAllPersonalInformation,
  getSinglePersonalInformationReducer,
} from "./userProfile/personalinformation/PersonalInformationReducers";
import { getAllContactAddressReducer } from "./userProfile/contactAddress/ContactAddressReducers";
import {
  getAllContactNumberReducer,
  getSingleContactNumberReducer,
} from "./userProfile/contactNumber/ContactNumberReducers";
import { getAllEducationReducer } from "./userProfile/education/EducationReducers";
import {
  getAllEmailReducer,
  getSingleEmailReducer,
} from "./userProfile/email/EmailReducers";
import { getAllFamilyMemberReducer } from "./userProfile/familyMember/FamilyMemberReducers";
import {
  getAllGuardianReducer,
  getSingleGuardianReducer,
} from "./userProfile/gurdian/GuardianReducers";
import { getAllHobbyReducer } from "./userProfile/hobby/HobbyReducers";
import { getAllJobHistoryReducer } from "./userProfile/jobHistory/JobHistoryReducers";
import { getAllSkillReducer } from "./userProfile/skill/SkillReducers";
import { getAllTrainingReducer } from "./userProfile/training/TrainingReducers";
import {
  getAllUploadPhotoReducer,
  uploadPhotoReducer,
} from "./userProfile/uploadPhoto/UploadPhotoReducers";
import {
  getAllClassSubjectReducer,
  getClassSubjectListReducer,
  getSingleClassSubjectReducer,
  getToCreateClassSubjectReducer,
  postToCreateClassSubjectReducer,
  updateSingleClassSubjectReducer,
} from "./settings/academicConfiguration/classSubject/ClassSubjectReducers";
import {
  getInitialRoleForPermissionReducer,
  getlistPermissionByRoleReducer,
} from "./settings/accessControl/PermissionByRole/PermissionByRoleReducers";
import {
  getAllSearchTeacherFacSubInitialDataReducer,
  getAllSearchTeacherFacSubListDataReducer,
} from "./settings/teacherMapping/searchTeacherFacultySubject/SearchTeacherFacultySubjectReducers";
import {
  getAllStudentMonthlyPresentSheetReducer,
  getEnglishDateReducer,
  getSubjectOptionsForSelectReducer,
} from "./attendance/studentMonthlyPresentSheet/StudentMonthlyPresentSheetReducers";
//examination reducers link end
export const reducers = combineReducers({
  navLink: navLinkReducer,
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
  getResetPasswordDataSingleEmployee: getResetPasswordDataSingleEmployeeReducer,
  resetPasswordForSingleEmployee: resetPasswordForSingleEmployeeReducer,
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
  resetSingleStudentProfilePassword: resetSingleStudentProfilePasswordReducer,
  getSingleStudentProfileEditData: getSingleStudentProfileEditDataReducer,
  assignFacultySubjectPost: assignFacultySubjectPostReducer,
  getSingleassignFacultySubject: getSingleassignFacultySubjectReducer,
  assignFacultySubjectEdit: assignFacultySubjectEditReducer,
  assignFacultySubjectEditPost: assignFacultySubjectEditPostReducer,
  assignFacultySubjectGenerate: assignFacultySubjectGenerateReducer,
  studentProfile: getAllStudentProfile,
  getListStudentProfile: getListStudentProfileReducer,
  getSingleStudentProfileDetails: getSingleStudentProfileDetailsReducer,
  getSingleStudentProfilePasswordresetData:
    getSingleStudentProfilePasswordresetDataReducer,
  updateSingleStudentProfile: updateSingleStudentProfileReducer,
  getInitialStudentIdCardData: getInitialStudentIdCardDataReducer,
  getActiveStudentsForStudentIdCardData:
    getActiveStudentsForStudentIdCardDataReducer,
  getAllReassociateStudents: getAllReassociateStudentsReducer,
  getReassociateStudentsLists: getReassociateStudentsListsReducer,
  getReassociateStudentsLevelup: getReassociateStudentsLevelupReducer,
  getReassociateStudentsLevelupPost: getReassociateStudentsLevelupPostReducer,
  getAllSearchTeacherFacSubInitialData:
    getAllSearchTeacherFacSubInitialDataReducer,
  getAllSearchTeacherFacSubListData: getAllSearchTeacherFacSubListDataReducer,
  getAllTeacherFacSubInitialData: getAllTeacherFacSubInitialDataReducer,
  getAllTeacherFacSubListData: getAllTeacherFacSubListDataReducer,
  getSingleTeacherFacSubData: getSingleTeacherFacSubDataReducer,
  singleTeacherFacSubEdit: singleTeacherFacSubEditReducer,
  createTeacherFacSubInitData: createTeacherFacSubInitDataReducer,
  createSingleTeacherFacSub: createSingleTeacherFacSubReducer,
  getAllClassSubject: getAllClassSubjectReducer,
  getClassSubjectList: getClassSubjectListReducer,
  getSingleClassSubject: getSingleClassSubjectReducer,
  updateSingleClassSubject: updateSingleClassSubjectReducer,
  getToCreateClassSubject: getToCreateClassSubjectReducer,
  postToCreateClassSubject: postToCreateClassSubjectReducer,
  getInitialRoleForPermission: getInitialRoleForPermissionReducer,
  getlistPermissionByRole: getlistPermissionByRoleReducer,
  //examination reducers start
  getAllAcademicStudentExamdata: getAllAcademicStudentExamdataReducer,
  getEvent: getEventReducer,
  getEventSchedule: getEventScheduleReducer,
  getExamEntrySearchData: getExamEntrySearchDataReducer,
  getExamEntryBulk: getExamEntryBulkReducer,
  getAllStudentAttendanceInitialData: getAllStudentAttendanceInitialDataReducer,
  getAllStudentAttendance: getAllStudentAttendanceReducer,
  getBulkStudentAttendance: getBulkStudentAttendanceReducer,
  postBulkStudentAttendance: postBulkStudentAttendanceReducer,
  getInitialExamApprovalData: getInitialExamApprovalDataReducer,
  getExamApprovalScheduleHeader: getExamApprovalScheduleHeaderReducer,
  getExamApprovalSearchData: getExamApprovalSearchDataReducer,
  postBulkExamApproval: postBulkExamApprovalReducer,
  getBulkExamApprovalSearchData: getBulkExamApprovalSearchDataReducer,
  getInitialLevelTestData: getInitialLevelTestDataReducer,
  getBulkLevelTestData: getBulkLevelTestDataReducer,
  postBulkLevelTestData: postBulkLevelTestDataReducer,
  getInitialAdmitCardData: getInitialAdmitCardDataReducer,
  getActiveStudentsForAdmitCardData: getActiveStudentsForAdmitCardDataReducer,
  searchStudentsForAdmitCardData: searchStudentsForAdmitCardDataReducer,
  printStudentsAdmitCardData: printStudentsAdmitCardDataReducer,
  getInitialExamResultData: getInitialExamResultDataReducer,
  getEventForExamMark: getEventForExamMarkReducer,
  getInitialExamResultStudentOptions: getInitialExamResultStudentOptionsReducer,
  getExamResultList: getExamResultListReducer,
  printExamResult: printExamResultReducer,
  getExamLedgerHeader: getExamLedgerHeaderReducer,
  academicGrading: getAllAcademicGradingReducer,
  getSingleAcademicGrading: getSingleAcademicGradingReducer,
  createAcademicGrading: createAcademicGradingReducer,
  getSingleAcademicGradingforEdit: getSingleAcademicGradingforEditReducer,
  updateSingleAcademicGrading: updateSingleAcademicGradingReducer,
  getAllGeneratePublish: getAllGeneratePublishReducer,
  getAllGenerate: getAllGenerateReducer,
  getAllGeneratePublishResult: getAllGeneratePublishResultReducer,
  getAllExamDivision: getAllExamDivisionReducer,
  getSingleExamDivision: getSingleExamDivisionReducer,
  createExamDivision: createExamDivisionReducer,
  getSingleExamDivisionEdit: getSingleExamDivisionEditReducer,
  updateSingleExamDivision: updateSingleExamDivisionReducer,
  getAllExamScheduleInitialData: getAllExamScheduleInitialDataReducer,
  getExamScheduleList: getExamScheduleListReducer,
  //examination reducers end
  //registration reducers starts
  getCounterConfigInitialData: getCounterConfigInitialDataReducer,
  getCounterConfigInitialDataForCreate:
    getCounterConfigInitialDataForCreateReducer,
  counterConfigCreate: counterConfigCreateReducer,
  getCounterConfigList: getCounterConfigListReducer,
  getCounterConfigInitialDataForEdit: getCounterConfigInitialDataForEditReducer,
  counterConfigEdit: CounterConfigEditReducer,
  getInitialStudentRegistrationData: getInitialStudentRegistrationDataReducer,
  getStudentRegistrationData: getStudentRegistrationDataReducer,
  getSingleStudentRegistrationData: getSingleStudentRegistrationDataReducer,
  singleStudentRegistrationCreate: singleStudentRegistrationCreateReducer,
  singleStudentRegistrationEdit: singleStudentRegistrationEditReducer,
  getCreateSingleStudentRegistrationData:
    getCreateSingleStudentRegistrationDataReducer,
  createSingleStudentRegistration: createSingleStudentRegistrationReducer,
  getAdmissionConfigInitialData: getAdmissionConfigInitialDataReducer,
  getAdmissionConfigListData: getAdmissionConfigListDataReducer,
  getSingleAdmissionConfig: getSingleAdmissionConfigReducer,
  updateSingleAdmissionConfig: updateSingleAdmissionConfigReducer,
  getCreateSingleAdmissionConfig: getCreateSingleAdmissionConfigReducer,
  createSingleAdmissionConfig: createSingleAdmissionConfigReducer,
  //registration reducers ends
  //user profile reducers starts
  //PID PersonalInformation
  getAllPersonalInformation: getAllPersonalInformation,
  getSinglePersonalInformation: getSinglePersonalInformationReducer,
  getAllContactAddress: getAllContactAddressReducer,
  getAllContactNumber: getAllContactNumberReducer,
  getSingleContactNumber: getSingleContactNumberReducer,
  getAllEducation: getAllEducationReducer,
  getAllEmail: getAllEmailReducer,
  getSingleEmail: getSingleEmailReducer,
  getAllFamilyMember: getAllFamilyMemberReducer,
  getAllGuardian: getAllGuardianReducer,
  getSingleGuardian: getSingleGuardianReducer,
  getAllHobby: getAllHobbyReducer,
  getAllJobHistory: getAllJobHistoryReducer,
  getAllSkill: getAllSkillReducer,
  getAllTraining: getAllTrainingReducer,
  getAllUploadPhoto: getAllUploadPhotoReducer,
  uploadPhoto: uploadPhotoReducer,
  //user profile reducers ends
  //attendance reducers starts
  getAllStudentMonthlyPresentSheet: getAllStudentMonthlyPresentSheetReducer,
  getSubjectOptionsForSelect: getSubjectOptionsForSelectReducer,
  getEnglishDate: getEnglishDateReducer,
  //attendance reducers ends
});

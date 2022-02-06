import {
  Accessible,
  PeopleOutline,
  ChromeReaderMode,
  Face,
  Settings,
  PostAdd,
  RecordVoiceOver,
} from "@material-ui/icons";
export const SettingsRoute = [
  {
    name: "School Configuration",
    route: "/settings",
    icon: PostAdd,
    exact: true,
  },
  {
    name: "Employee Management",
    route: "/employee-management",
    icon: Accessible,
    exact: false,
  },
  {
    name: "Academic Configuration",
    route: "/academic-configuration",
    icon: ChromeReaderMode,
    exact: false,
  },
  {
    name: "Teacher Mapping",
    route: "/teacher-mapping",
    icon: PeopleOutline,
    exact: false,
  },
  {
    name: "Student Management",
    route: "/student-management",
    icon: Face,
    exact: false,
  },
  {
    name: "Access Control",
    route: "/access-control",
    icon: Settings,
    exact: false,
  },
  {
    name: "Class Schedule",
    route: "/class-schedule",
    icon: ChromeReaderMode,
    exact: false,
  },
  { name: "Notice", route: "/notice", icon: PostAdd, exact: false },
  {
    name: "Announcement",
    route: "/announcement",
    icon: RecordVoiceOver,
    exact: false,
  },
];

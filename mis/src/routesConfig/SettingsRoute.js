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
    name: "Teacher's Subject",
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
    name: "Class Routine",
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
  {
    name: "Old Questions",
    route: "/old-questions",
    icon: ChromeReaderMode,
    exact: false,
  },
  {
    name: "Syllabus",
    route: "/syllabus",
    icon: ChromeReaderMode,
    exact: false,
  },
];

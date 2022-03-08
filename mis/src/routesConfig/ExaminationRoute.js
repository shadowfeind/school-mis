import {
  School,
  Accessible,
  PeopleOutline,
  ChromeReaderMode,
  Face,
  Settings,
  PostAdd,
  RecordVoiceOver,
} from "@material-ui/icons";
export const ExaminationRoute = [
  {
    name: "Academic Grading",
    route: "/examination",
    icon: RecordVoiceOver,
    exact: false,
  },
  {
    name: "Exam Division",
    route: "/exam-division",
    icon: Accessible,
    exact: false,
  },
  {
    name: "Full/Pass Marks",
    route: "/exam-schedule",
    icon: ChromeReaderMode,
    exact: false,
  },
  {
    name: "Admit Card",
    route: "/print-admit-card",
    icon: PeopleOutline,
    exact: false,
  },
  // {
  //   name: "Exam Mark Entry",
  //   route: "/exam-mark-entry",
  //   icon: Face,
  //   exact: false,
  // },
  {
    name: "Exam Mark Entry/Update",
    route: "/exam-mark-approval",
    icon: Settings,
    exact: false,
  },
  {
    name: "Generate/Publish Result",
    route: "/generatepublish-result",
    icon: PostAdd,
    exact: false,
  },

  {
    name: "Student Attendance",
    route: "/student-attendance",
    icon: School,
    exact: false,
  },
  {
    name: "ECA",
    route: "/level-test",
    icon: Accessible,
    exact: false,
  },
  {
    name: "ECA Data",
    route: "/eca-data",
    icon: Accessible,
    exact: false,
  },
  {
    name: "Exam Result(Print)",
    route: "/exam-result",
    icon: RecordVoiceOver,
    exact: false,
  },
];

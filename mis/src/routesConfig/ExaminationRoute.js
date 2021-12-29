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
    name: "Exam Schedule",
    route: "/exam-schedule",
    icon: ChromeReaderMode,
    exact: false,
  },
  {
    name: "Print Admit Card",
    route: "/print-admit-card",
    icon: PeopleOutline,
    exact: false,
  },
  {
    name: "Exam Mark Entry",
    route: "/exam-mark-entry",
    icon: Face,
    exact: false,
  },
  {
    name: "Exam Mark Approval",
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
    name: "Exam Result",
    route: "/exam-result",
    icon: RecordVoiceOver,
    exact: false,
  },
  {
    name: "Student Attendance",
    route: "/student-attendance",
    icon: School,
    exact: false,
  },
  {
    name: "Level Test",
    route: "/level-test",
    icon: Accessible,
    exact: false,
  },
];

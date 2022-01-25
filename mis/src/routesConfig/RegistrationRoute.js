import {
  Accessible,
  PeopleOutline,
  ChromeReaderMode,
} from "@material-ui/icons";
export const RegistrationRoute = [
  {
    name: "Counter Configuraion",
    route: "/registration",
    icon: PeopleOutline,
    exact: false,
  },
  {
    name: "Admission Configuraion",
    route: "/admission-configuration",
    icon: Accessible,
    exact: false,
  },
  {
    name: "Student Registration",
    route: "/student-registration",
    icon: ChromeReaderMode,
    exact: false,
  },
];

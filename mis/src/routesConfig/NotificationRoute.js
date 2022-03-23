import {
    Accessible,
    PeopleOutline,
    ChromeReaderMode,
    Face,
    Settings,
    PostAdd,
    RecordVoiceOver,
  } from "@material-ui/icons";

  export const NotificationRoute = [
    {
        name: "Class Notification",
        route: "/notification",
        icon: PostAdd,
        exact: true,
      },
      {
        name: "Teacher Notification",
        route: "/teacher-notification",
        icon: Accessible,
        exact: false,
      },
  ]

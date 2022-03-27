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
      name: "Announcement",
      route: "/notification",
      icon: RecordVoiceOver,
      exact: false,
    },
    {
        name: "Class Notification",
        route: "/class-notification",
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

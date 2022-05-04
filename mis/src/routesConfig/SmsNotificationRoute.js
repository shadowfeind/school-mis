import AnnouncementIcon from '@material-ui/icons/Announcement';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

  export const SMSNotificationRoute = [
    {
      name: "Announcement",
      route: "/sms-notification",
      icon: AnnouncementIcon,
      exact: false,
    },
    {
        name: "Class Notification",
        route: "/sms-class-notification",
        icon: NotificationsActiveIcon,
        exact: true,
      },
      {
        name: "Teacher Notification",
        route: "/sms-teacher-notification",
        icon: RecordVoiceOverIcon,
        exact: false,
      },
  ]

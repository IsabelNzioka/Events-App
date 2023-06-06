import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, //{title, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState(); //state that stores the notification that should be shown ,if any

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      //   cleanup function - to clear timer if sueEffect reruns before the timer went off , so that we dont have multiple timers going on at the same time
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    // parameter - info abt the notification that should be shown

    //   title: notificationData.title,
    //   message: notificationData.message,
    //   status: notificationData.status,

    setActiveNotification(notificationData);
  }
  function hideNotificationHandler() {
    setActiveNotification(null); //reset it and get rid of it
  }

  //   bundle notificationData and pointer set these functions together into one object which we can the distribute as context to the other components in the app

  //   our object, which has a structure defined in NotificationContext - intial context
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  //   distribute this to all components that are interested through the  value prop on the Provider component

  //   whenever we change this state up there ,by ex, calling show or hide handler, the NotificationContextProvider component will re-render,
  //    and will distribute the updated context object to interested component
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;

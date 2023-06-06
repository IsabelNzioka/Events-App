import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";

import NotificationContext from "../../store/notification-context";

function Layout(props) {
  // pass the context to whicih we want to extablish a connection as an argument to useContext() - to connect to the context object
  const notificationCtx = useContext(NotificationContext); //gives us access to that Context value
  // now we cna use that context to call, or show or hide notification, or to get the current notification data

  const activeNotification = notificationCtx.notification; //check is its null or not

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>

      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;

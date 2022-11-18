import { ReactNode, useContext } from "react";
import NotificationContext from "../../contexts/notification-context";
import Notification from "../notification/Notification";
import MainHeader from "./MainHeader";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const { notification, display } = useContext(NotificationContext);
  return (
    <>
      <MainHeader />
      <div>{children}</div>

      {display ? (
        <Notification
          title={notification ? notification.title : ""}
          status={notification ? notification.status : ""}
          text={notification ? notification.text : ""}
        />
      ) : null}
    </>
  );
}

export default Layout;

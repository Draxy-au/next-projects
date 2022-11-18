import { ReactNode } from "react";
import MainHeader from "./MainHeader";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <MainHeader />
      <div>{children}</div>
    </>
  );
}

export default Layout;

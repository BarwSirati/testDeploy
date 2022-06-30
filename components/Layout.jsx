import { Fragment } from "react";
import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main className="md:p-10 flex-1 p-5 overflow-x-hidden">{children}</main>
    </Fragment>
  );
};

export default Layout;

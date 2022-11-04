import React from "react";
import Navbar from "./header.component";

const Layout = (props: any) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;

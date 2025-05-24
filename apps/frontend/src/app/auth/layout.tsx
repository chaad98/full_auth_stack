import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Layout = (props: Props) => {
  return (
    <div className="bg-gradient-to-br from-lime-400 to-cyan-400 h-screen flex items-center justify-center">
      {props.children}
    </div>
  );
};

export default Layout;

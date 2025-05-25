import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Dashboard = (props: Props) => {
  return <div>{props.children}</div>;
};

export default Dashboard;

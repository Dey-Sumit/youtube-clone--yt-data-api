import React from "react";
import "./sidebarItem.scss";

const SidebarItem = ({ Icon, text }) => {
  return (
    <div className="sidebarItem">
      <Icon size={23} />
      <span className="ml-3">{text}</span>
    </div>
  );
};

export default SidebarItem;

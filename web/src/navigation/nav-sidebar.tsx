import React, { useState } from "react";

import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';

import { IconType } from "react-icons";
import { MdHome, MdPeople, MdLogout, MdCalendarToday, MdPostAdd, MdOutlineDescription,
  MdOutlineEditCalendar, MdOutlineLibraryBooks, MdOutlineInsertChartOutlined,
  MdOutlineAdminPanelSettings, MdOutlineWidgets, MdOutlineShoppingCart,
  MdOutlineNotes } from "react-icons/md";
import { CgUserList } from "react-icons/cg"
import { IoHammerOutline } from "react-icons/io5"

export function SideBar() {
  const [isCollapsed, toggleCollapse] = useState(false)
  return (
    <ProSidebar
      breakPoint={"xs"} collapsed={isCollapsed}>
      <SidebarHeader>

      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          {sideBarElementsLoggedIn.map(renderElement)}
          <SubMenu title="Admin" icon={<MdOutlineAdminPanelSettings/>}>
            {sideBarElementsAdmin.map(renderElement)}
          </SubMenu>
          <MenuItem icon={<MdLogout/>}>Logout</MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <button title={"abc"} onClick={() => toggleCollapse(!isCollapsed)}>abc</button>
      </SidebarFooter>
    </ProSidebar>
  );
}

interface SideBarElement {
  title: string,
  to: string,
  icon: IconType,
}

const sideBarElementsLoggedIn: Array<SideBarElement> = [
  { title: "Home", to: "/", icon: MdHome },
  { title: "Job Sheet", to: "jsheet", icon: MdOutlineDescription },
  { title: "Attached Job Sheets", to: "attjsheets", icon: MdOutlineLibraryBooks },
  { title: "Job Start Form", to: "jstartform", icon: MdPostAdd },
  { title: "Timesheet", to: "timesheet", icon: MdCalendarToday },
  { title: "Job Report", to: "jreport", icon: MdOutlineInsertChartOutlined },
  { title: "User Maintenance", to: "usermaintenance", icon: MdPeople },
]
const sideBarElementsAdmin: Array<SideBarElement> = [
  { title: "Company Notes", to: "", icon: MdOutlineNotes },
  { title: "Client List", to: "", icon: CgUserList },
  { title: "Product Suppliers", to: "", icon: MdOutlineShoppingCart },
  { title: "Products", to: "", icon: MdOutlineWidgets },
  { title: "Timesheet Codes", to: "", icon: MdOutlineEditCalendar },
  { title: "Job Prefixes", to: "", icon: IoHammerOutline },
]
const renderElement = (item: SideBarElement) =>
  <MenuItem
    key={item.title}
    icon={<item.icon />}
  >
    {item.title}
    <Link to={item.to} />
  </MenuItem>

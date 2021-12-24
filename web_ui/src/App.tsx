import React from 'react';
import { Routes, Route, useParams, Outlet, NavLink, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import { SideBar } from "./navigation/nav-sidebar";
import { ResponsiveDrawer } from "./navigation/mui-nav"
import LoadingTable from "./mui/loading-table";
import { createTheme, ThemeProvider } from "@mui/material";


const theme = createTheme({

});
function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home menuType={"Home"}/>} />
          <Route path="jsheet" element={<Home menuType={"Job Sheet"}/>} />
          <Route path="attjsheets" element={<Home menuType={"Attached Job Sheets"}/>} />
          <Route path="jstartform" element={<Home menuType={"Job Start Form"}/>} />
          <Route path="timesheet" element={<Home menuType={"Timesheet"}/>} />
          <Route path="jreport" element={<Home menuType={"Job Report"}/>} />
          <Route path="usermaintenance" element={<Home menuType={"User Maintenance"}/>} />
          <Route path="logout" element={<Home menuType={"Logout"}/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}

function Layout() {
  return (
    <div className={"App"}>
      <h1 className={"App-title"}>CPR Electrical Employee Dashboard</h1>
      <div className="content">
        <SideBar />

        <Outlet />
      </div>
    </div>

  );
}

function Home({ menuType }: {menuType: string} = {menuType: "Home"}) {
  return (
      <header className="App-header">
        <LoadingTable />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Current item: <code>{menuType}</code>
        </p>

      </header>
  );
}


function NotFound() {
  return <h1>Page not found</h1>
}
export default App;

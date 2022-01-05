import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import NewHome from './main-screens/home'
import LoginPage from './main-screens/login'
import { ResponsiveDrawer } from "./navigation/mui-nav"
import LoadingTable from "./mui/loading-table";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import CollapsibleTable from "./mui/data-table";

const theme = createTheme({
  palette: {
    // @ts-ignore
    mode: 'dark',
    primary: {
      main: '#F7931D',
    },
    secondary: {
      main: '#2A2A2A',
    },
  },
});


function App() {

  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewHome menuType={"Home"}/>} />
          <Route path="jsheet" element={<LoginPage menuType={"Job Sheet"}/>} />
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
      <div>
      <ThemeProvider theme={theme}>
        <ResponsiveDrawer>
          <Outlet />
        </ResponsiveDrawer>
      </ThemeProvider>
      </div>
    </div>

  );
}

function Home({ menuType }: {menuType: string} = {menuType: "Home"}) {
  return (
      <header className="App-header">
        <LoadingTable />
        <CollapsibleTable />
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

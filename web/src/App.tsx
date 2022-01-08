import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";

import './App.css';
import NewHome from './main-screens/home'
import LoginPage from './main-screens/login'
import { ResponsiveDrawer } from "./navigation/mui-nav"
import LoadingTable from "./mui/loading-table";
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import CollapsibleTable from "./mui/data-table";
import PrivateRoute from './utils/AuthenticatedRoute'
import { ProvideAuth } from "./utils/auth-provider";
import JobSheet from "./main-screens/job-sheet";
import AlignItemsList from "./main-screens/client-list";
import ClientV2 from "./main-screens/client-v2";

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
  const [light, setLight] = React.useState(true);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProvideAuth>
        <RoutesWrapper />
      </ProvideAuth>
    </ThemeProvider>
  )
}

const PrivateRouteWrapper = ({menuType}: {menuType: string}) => {
  return (
    <PrivateRoute>
      <Home menuType={menuType}/>
    </PrivateRoute>
  );
}
function RoutesWrapper() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={
          <PrivateRoute>
            <NewHome/>
          </PrivateRoute>
        }/>
        <Route path="jsheet" element={
          <PrivateRoute>
            <JobSheet/>
          </PrivateRoute>
        }/>

        <Route path="login" element={
          <LoginPage menuType={"Login"}/>
        }/>

        <Route path="attjsheets" element={
          <ClientV2/>
        }/>
        <Route path="jstartform" element={<PrivateRouteWrapper menuType={"Job Start Form"}/>}/>
        <Route path="timesheet" element={<PrivateRouteWrapper menuType={"Timesheet"}/>}/>
        <Route path="jreport" element={<PrivateRouteWrapper menuType={"Job Report"}/>}/>
        <Route path="usermaintenance" element={<PrivateRouteWrapper menuType={"User Maintenance"}/>}/>
        <Route path="clients" element={
          <PrivateRoute>
            <AlignItemsList/>
          </PrivateRoute>
        }/>
        <Route path="logout" element={<PrivateRouteWrapper menuType={"Logout"}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className={"App"}>
      <ResponsiveDrawer>
        <Outlet />
      </ResponsiveDrawer>
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
  return <h1>Page not found - AKA Not implemented...</h1>
}
export default App;

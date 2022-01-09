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
import create from 'zustand';
import { persist } from "zustand/middleware";
import { lightTheme, darkTheme } from './styling/theme'
import SubClient from "./sub-menus/site-editor";
import JobMain from "./sub-menus/job-main";

interface GlobalStore {
  isDarkTheme: boolean;
  title: string;
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
  setTitle: (title: string) => void;
}

//@ts-ignore
export const useStore = create<GlobalStore>(persist(
  set => ({
    isDarkTheme: true,
    title: "Home",
    toggleTheme: () => set(state => ({ isDarkTheme: !state.isDarkTheme })),
    setTheme: (isDark: boolean) => set({ isDarkTheme: isDark }),
    setTitle: (title: string) => set({title: title}),
  }),
  {
    name: "dark-mode",
  })
)


function App() {
  const isDark = useStore(state => state.isDarkTheme)
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
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

        <Route path="jsheet">
          <Route index element={
            <PrivateRoute>
              <JobSheet/>
            </PrivateRoute>
          }/>
          <Route path={":jid"} element={<JobMain />}/>
        </Route>

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

        <Route path="clients">
          <Route index element={
            <PrivateRoute>
              <AlignItemsList/>
            </PrivateRoute>
          }/>
          <Route path={":client"} element={<SubClient/>}/>
        </Route>

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

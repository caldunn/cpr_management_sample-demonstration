import { createTheme } from "@mui/material";

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarColor: "#6b6b6b #2b2b2b",
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          backgroundColor: "#2b2b2b",
        },
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
          borderRadius: 8,
          backgroundColor: "#6b6b6b",
          minHeight: 24,
          border: "3px solid #2b2b2b",
        },
        "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
          backgroundColor: "#959595",
        },
        "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
          backgroundColor: "#959595",
        },
        "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#959595",
        },
        "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
          backgroundColor: "#2b2b2b",
        },
      },
    },
  },
};

const darkTheme = createTheme({
  components: components,
  palette: {
    // @ts-ignore
    mode: 'dark',
    primary: {
      main: '#F7931D',
    },
    secondary: {
      main: '#121212'
    },
  },
});

const lightTheme = createTheme({
  components: components,
  palette: {
    // @ts-ignore
    mode: 'light',
    primary: {
      main: '#F7931D',
    },
    secondary: {
      // main: '#2A2A2A',
      main: '#2A2A2A'
    },
  },
});

export { lightTheme, darkTheme }
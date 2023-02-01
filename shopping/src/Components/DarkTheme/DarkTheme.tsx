import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo } from "react";

const getDesignTokens = (mode: any) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#121212",
            dark: "#F3EFE2",
          },
        }
      : {
          primary: {
            main: "#fff",
            dark: "#121212",
          },
          text: {
            secondary: "#fff",
          },
          backgroundColor:"black"
        }),
  },
});

export default function DarkTheme({children}: { children: React.ReactNode}) {
  const [mode, setMode] = useState("light");
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  useMemo(() => {
    darkMode ? setMode("dark") : setMode("light");
  }, [darkMode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

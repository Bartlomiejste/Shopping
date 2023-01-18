import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo } from "react";

const getDesignTokens = (mode: any) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#121212",
            dark: "#F3EFE2",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#fff",
            dark: "#121212",
          },
          text: {
            secondary: "#fff",
          },
        }),
  },
});

export default function DarkTheme(children: any) {
  const [mode, setMode] = useState("light");
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  useMemo(() => {
    darkMode ? setMode("dark") : setMode("light");
  }, [darkMode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

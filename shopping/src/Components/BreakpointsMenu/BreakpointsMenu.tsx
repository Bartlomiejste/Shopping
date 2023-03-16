import { ThemeProvider, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { useAppSelector } from "../../state/hooks";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    bg: true;
    lg: true;
    xl: false;
  }
}

const BreakPointTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 300,
      md: 600,
      bg: 900,
      lg: 1200,
    },
  },
});

export { BreakPointTheme };

const BoxStyle = (BreakPointTheme: Theme) => ({
  backgroundColor: useAppSelector((state) =>
    state.theme.darkMode ? "gray" : "white"
  ),
  display: "flex",
  alignItems: "center",
  height: "100px",
  top: 0,
  margin: "0 auto",
  position: "fixed",
  width: "90%",
  zIndex: 100,

  [BreakPointTheme.breakpoints.down("xs")]: {},
  [BreakPointTheme.breakpoints.up("sm")]: {},
  [BreakPointTheme.breakpoints.up("md")]: {},
  [BreakPointTheme.breakpoints.up("bg")]: {},
  [BreakPointTheme.breakpoints.up("lg")]: {},
});
export { BoxStyle };

export default function BreakPointTextField() {
  return (
    <>
      <ThemeProvider theme={BreakPointTheme}>
        <Box
          sx={{
            ...BoxStyle(BreakPointTheme),
          }}
        />
      </ThemeProvider>
    </>
  );
}

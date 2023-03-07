import { ThemeProvider, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "100px",
  top: 0,
  left: 0,
  position: "fixed",
  width: "100%",
  zIndex: 100,
  backgroundColor: "#DBDCDE",

  [BreakPointTheme.breakpoints.down("xs")]: {},
  [BreakPointTheme.breakpoints.up("sm")]: {},
  [BreakPointTheme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
  },
  [BreakPointTheme.breakpoints.up("bg")]: {
    justifyContent: "flex-end",
  },
  [BreakPointTheme.breakpoints.up("lg")]: {
    justifyContent: "flex-end",
  },
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

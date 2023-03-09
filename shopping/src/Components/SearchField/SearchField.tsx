import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

export default function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 250,
        height: 30,
        background: "#F5F7F9",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: "13px" }}
        placeholder="Search products"
        inputProps={{ "aria-label": "Search products" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

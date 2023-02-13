import * as React from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleTheme } from "../state/ModeTheme";

export default function ControlledSwitches() {
  const darkMode = useSelector((state: any) => state.darkMode);
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(toggleTheme());
  };
  return (
    <>
      <Switch
        sx={{ marginLeft: 8 }}
        value={darkMode}
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
}

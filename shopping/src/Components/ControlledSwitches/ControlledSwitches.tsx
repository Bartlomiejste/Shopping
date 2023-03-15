import * as React from "react";
import Switch from "@mui/material/Switch";
import { toggleTheme } from "../../state/darkMode";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
export default function ControlledSwitches() {
  const darkMode = useAppSelector((state: any) => state.darkMode);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(toggleTheme());
  };
  return (
    <Switch
      sx={{ marginLeft: 5 }}
      value={darkMode}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

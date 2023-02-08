// import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SimpleBottomNavigation() {
  //   const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      sx={{ background: "transparent" }}
      // value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
    >
      <BottomNavigationAction icon={<FavoriteIcon sx={{ fontSize: 30 }} />} />
    </BottomNavigation>
  );
}

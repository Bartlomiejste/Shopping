// import * as React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StoreIcon from "@mui/icons-material/Store";




export default function SimpleBottomNavigation() {
  //   const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      sx={{
        background: "transparent",
        transition: "none",
      }}
      showLabels
      // value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
     
    >

      <BottomNavigationAction
        label="Shop"
        icon={<StoreIcon sx={{ fontSize: 30 }} />}
      />

    </BottomNavigation>
   
  );
}

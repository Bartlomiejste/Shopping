import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StoreIcon from "@mui/icons-material/Store";

export default function SimpleBottomNavigation() {
  return (
    <BottomNavigation
      sx={{
        background: "transparent",
      }}
    >
      <BottomNavigationAction icon={<StoreIcon sx={{ fontSize: 25 }} />} />
    </BottomNavigation>
  );
}

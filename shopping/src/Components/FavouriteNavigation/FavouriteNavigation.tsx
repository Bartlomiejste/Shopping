import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SimpleBottomNavigation() {
  return (
    <BottomNavigation
      sx={{
        background: "transparent",
      }}
    >
      <BottomNavigationAction icon={<FavoriteIcon sx={{ fontSize: 30 }} />} />
    </BottomNavigation>
  );
}

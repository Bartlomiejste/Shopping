import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Favourite: React.FC = () => {
  return (
    <BottomNavigation sx={{ background: "transparent" }}>
      <BottomNavigationAction icon={<FavoriteIcon sx={{ fontSize: 30 }} />} />
    </BottomNavigation>
  );
};

export default Favourite;

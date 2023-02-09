import { Link } from "react-router-dom";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import FavouriteNavigation from "../FavouriteNavigation/FavouriteNavigation";

export const Navigation = () => {
  return (
    <>
      <Link to="/">
        <BottomNavigation />
      </Link>
      <Link to="/favourite">
        <FavouriteNavigation />
      </Link>
    </>
  );
};

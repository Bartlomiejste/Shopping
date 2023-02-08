import { Link } from "react-router-dom";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import Favourite from "../../pages/Favourite";

export const Navigation = () => {
  return (
    <>
      <Link to="/">
        <BottomNavigation />
      </Link>
      <Link to="/favourite">
        <Favourite />
      </Link>
    </>
  );
};

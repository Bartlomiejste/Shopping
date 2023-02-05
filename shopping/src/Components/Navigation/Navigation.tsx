import { Link } from "react-router-dom";
import BottomNavigation from "../BottomNavigation/BottomNavigation";

export const Navigation = () => {
  return <Link to="/">{<BottomNavigation />}</Link>;
};

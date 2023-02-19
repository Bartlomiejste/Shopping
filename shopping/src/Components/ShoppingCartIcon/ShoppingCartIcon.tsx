import { Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartProductType } from "../../pages/Main";
import BottomNavigation from "@mui/material/BottomNavigation";

type Props = {
  cartProduct: CartProductType[];
  setCartOpen: (clickedItem: boolean) => void;
};

const ShoppingCartIcon = ({ cartProduct, setCartOpen }: Props) => {
  const getTotalItems = (items: CartProductType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  return (
    <BottomNavigation
      sx={{
        background: "transparent",
      }}
    >
      <IconButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartProduct)} color="error">
          <AddShoppingCartIcon sx={{ fontSize: 30 }} />
        </Badge>
      </IconButton>
    </BottomNavigation>
  );
};

export default ShoppingCartIcon;

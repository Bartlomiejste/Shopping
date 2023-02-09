import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";

export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

type Props = {
  item: CartProductType;
  products: CartProductType[];
  setProducts: (clickedItem: CartProductType[]) => any;
};

const FavouriteComponents = ({ products, setProducts, item }: Props) => {
  const onFavorite = (items: CartProductType) => {
    setProducts([...products, items]);
  };

  // function to remove an item from favorite list
  const onRemoveFavorite = (items: CartProductType) => {
    const filteredItems = products.filter(
      (item: { id: number }) => item.id !== items.id
    );
    setProducts(filteredItems);
  };

  // function to check if an item exists in the favorite list or not
  const ifExists = (items: { id: any }) => {
    if (
      products.filter((item: { id: any }) => item.id === items.id).length > 0
    ) {
      return true;
    }
    return false;
  };
  return (
    <BottomNavigation sx={{ background: "transparent" }}>
      <BottomNavigationAction
        onClick={() =>
          ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)
        }
        icon={<FavoriteIcon sx={{ fontSize: 30 }} />}
      />
    </BottomNavigation>
  );
};

export default FavouriteComponents;

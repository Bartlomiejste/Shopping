import { Box } from "@mui/material";
import Menu from "../pages/Menu";

export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const Main = () => {
  // const handleAddToCart = (clickedItem: CartProductType) => {
  //   setCartProduct((prev) => {
  //     const isItemInCart = prev.find((item) => item.id === clickedItem.id);

  //     if (isItemInCart) {
  //       return prev.map((item) =>
  //         item.id === clickedItem.id
  //           ? { ...item, amount: item.amount + 1 }
  //           : item
  //       );
  //     }
  //     return [...prev, { ...clickedItem, amount: 1 }];
  //   });
  // };

  return (
    <>
      <Menu />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "200px",
          justifyContent: "space-around",
          background: "gray",
        }}
      ></Box>
    </>
  );
};

export default Main;

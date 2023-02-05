import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as React from "react";
import { Box, Button } from "@mui/material";
import Main from "../../pages/Main";
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

const OneCart: React.FC = () => {
  const [product, setProduct] = useState<CartProductType | null>(null);
  const [value] = React.useState(0);
  const { id } = useParams();

  const getProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    setProduct(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Main />
      {product && (
        <Box
          sx={{
            display: "flex",
            paddingTop: "200px",
            justifyContent: "center",
            alignItems: "center",
            background: "gray",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "500px",
              width: "50%",
              background: "#fff",
              padding: "50px",
            }}
          >
            <Box>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "50%", height: "50%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                justifyContent: "space-evenly",
                fontFamily: "Arial",
              }}
            >
              <BottomNavigation
                showLabels
                value={value}
                sx={{
                  position: "relative",
                  top: "-20%",
                  left: "100%",
                  width: "0",
                }}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              >
                <BottomNavigationAction
                  // label="Favorites"
                  icon={<FavoriteIcon />}
                />
              </BottomNavigation>
              <Box style={{ fontWeight: "bold", fontSize: "16px" }}>
                {product.title}
              </Box>
              <Box style={{ fontSize: "25px", color: "green" }}>
                ${product.price}
              </Box>
              <Box style={{ fontSize: "14px" }}>{product.description}</Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyConten: "space-around",
                  alignItems: "space-around",
                }}
              >
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OneCart;

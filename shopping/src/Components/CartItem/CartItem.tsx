import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CartProductType } from "../../pages/Main";
import { Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  removeFromCart,
  addToCart,
  decreaseToCart,
} from "../../state/productsCart";
import { RootState } from "../../state/store";

const CartItem = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);

  const handleClearFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleAdd = (cartItems: CartProductType) => {
    dispatch(addToCart(cartItems));
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseToCart(id));
  };
  console.log(cartItems);

  return (
    <>
      {cartItems.map((item, id) => (
        <TableContainer component={Paper} key={id}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>
                  <img src={item.image} alt={item.title} width="70" />
                </TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button
                      size="small"
                      disableElevation
                      variant="contained"
                      onClick={() => handleAdd(item)}
                    >
                      +
                    </Button>
                    <Typography sx={{ margin: "0px 10px" }}>
                      {item.amount}
                    </Typography>
                    <Button
                      size="small"
                      disableElevation
                      variant="contained"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </Button>
                  </TableCell>
                </TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<ClearIcon />}
                    onClick={() => handleClearFromCart(item.id)}
                  />
                  ${(item.amount * item.price).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </>
  );
};

export default CartItem;

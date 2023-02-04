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

type Props = {
  item: CartProductType;
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
  clearFromCart: (id: number) => void;
};

const CartItem = ({
  item,
  addToCart,
  removeFromCart,
  clearFromCart,
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </Button>
                <Typography sx={{ margin: "0px 10px" }}>
                  {item.amount}
                </Typography>
                <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => addToCart(item)}
                >
                  +
                </Button>
              </TableCell>
            </TableCell>
            <TableCell align="right">
              <Button
                startIcon={<ClearIcon />}
                onClick={() => clearFromCart(item.id)}
              ></Button>
              ${(item.amount * item.price).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItem;

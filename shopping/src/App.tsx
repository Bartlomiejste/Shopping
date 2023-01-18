import "./index.css";
import CircularProgressWithLabel from "../src/Components/CircularProgressWithLabel/CircularProgressWithLabel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../src/Components/state/themeSlice";
import Layout from "../src/Components/Layout/Layout";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./Components/DarkTheme/DarkTheme";


const App = () => {
  const [loading, setLoading] = useState(true);
  const spinnerLoading = useSelector(
    (state: any) => state.theme.spinnerLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoading);
    setTimeout(() => {
      setLoading(spinnerLoading);
    }, 4000);
  }, [dispatch, spinnerLoading]);

  return (
    <>
      {loading ? (
        <CircularProgressWithLabel />
      ) : (
          <Layout />
      )}
    </>
  );
};

export default App;

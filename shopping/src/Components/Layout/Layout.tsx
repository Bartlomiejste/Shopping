import "../../index.css";
import CircularProgressWithLabel from "../CircularProgressWithLabel/CircularProgressWithLabel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../state/ModeTheme";
import Main from "../../pages/Main";

const App = () => {
  const [loading, setLoading] = useState(true);
  const spinnerLoading = useSelector((state: any) => state.spinnerLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoading);
    setTimeout(() => {
      setLoading(spinnerLoading);
    }, 4000);
  }, [dispatch, spinnerLoading]);

  return <>{loading ? <CircularProgressWithLabel /> : <Main />}</>;
};

export default App;

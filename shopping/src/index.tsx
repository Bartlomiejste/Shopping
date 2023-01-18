import ReactDOM from "react-dom/client";
import App from "../src/App";
import { store } from "../src/Components/state/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
  <Provider store={store}>
    <App />
  </Provider>
  </>
);

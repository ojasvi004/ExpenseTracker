import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserContextProvider from "./context/UserContextProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);

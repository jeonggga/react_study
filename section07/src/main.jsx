import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import ShoppingCart from "./study/ShoppingCart.jsx";

// createRoot(document.getElementById("root")).render(<App />);
// createRoot(document.getElementById("root")).render(<ShoppingCart />);
import ContactListApp from "./study/ContactList.jsx";
createRoot(document.getElementById("root")).render(<ContactListApp />);

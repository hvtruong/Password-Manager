/**
 * Initializes the React application by rendering the root component.
 * 
 * - Configures the application to disable React DevTools in production mode.
 * - Sets up the Redux store provider to manage global state.
 * - Utilizes React Router for client-side routing, rendering the `App` component
 *   for all routes.
 * - Wraps the application in `React.StrictMode` to highlight potential problems.
 * 
 * Assumes an HTML element with the ID "root" exists for mounting the React app.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { store } from "./app/store";
import { Provider } from "react-redux";
import App from "./App";
import "./style.css";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

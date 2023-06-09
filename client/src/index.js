import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import {store }from "./app/store";
import App from "./App";
import "./index.css"

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
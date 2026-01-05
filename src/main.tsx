import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <ContextProvider>
          <App />
        </ContextProvider>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);

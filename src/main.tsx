import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { HeroUIProvider } from "@heroui/react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <HeroUIProvider>
            <ContextProvider>
              <App />
            </ContextProvider>
          </HeroUIProvider>
        </StrictMode>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { HeroUIProvider } from "@heroui/react";
import { APIProvider } from "@vis.gl/react-google-maps";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <HeroUIProvider>
          <ContextProvider>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <App />
            </APIProvider>
          </ContextProvider>
        </HeroUIProvider>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);

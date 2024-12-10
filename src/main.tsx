import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CustomProvider>
        <NextUIProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NextUIProvider>
      </CustomProvider>
    </Provider>
  </StrictMode>
);

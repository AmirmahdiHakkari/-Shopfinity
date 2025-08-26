import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "../context/Theme-Provider.tsx";
import { ToastContainer } from "react-toastify";
import { store } from "../redux/store.ts";
import App from "./App.tsx";
import "../i18n/index.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <ToastContainer />
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </ThemeProvider>
);

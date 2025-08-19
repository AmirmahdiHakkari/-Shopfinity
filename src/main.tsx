import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./App-Router";
import { ThemeProvider } from "./context/Theme-Provider";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </ThemeProvider>
);

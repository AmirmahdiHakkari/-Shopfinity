import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./App-Router";
import { ThemeProvider } from "./context/Theme-Provider";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

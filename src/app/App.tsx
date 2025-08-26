import { Route, Routes, useLocation } from "react-router-dom";
import AuthChecker from "./AuthChecker";
import AboutPage from "../pages/public/About-Page";
import BasketPage from "../pages/public/Basket-Page";
import CheckoutPage from "../pages/public/Checkout-Page";
import ContactPage from "../pages/public/Contact-Page";
import ForgotPassword from "../pages/public/Forgot-pass-Page";
import Login from "../pages/public/Login-Page";
import NotFoundPage from "../pages/public/Not-Found-Page";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/dashboard/DashboardOverview";
import ProductsPage from "../pages/public/Products-Page";
import Navbar from "../layouts/public/Navbar";
import DashboardProducts from "../pages/dashboard/DashboardProducts";
import DashboardEditProduct from "../pages/dashboard/DashboardEditProduct";
import DashboardCreateProduct from "../pages/dashboard/DashboardCreateProduct";
import LandingPage from "../pages/public/Landing-Page";

export default function App() {
  const location = useLocation();
  const homeNotLogin = location.pathname.includes("dashboard");
  const landingPage = location.pathname === "/";

  return (
    <>
      {!homeNotLogin && !landingPage ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Basket" element={<BasketPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />

        <Route element={<AuthChecker />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/overview" element={<Overview />} />
            <Route path="/dashboard/products" element={<DashboardProducts />} />
            <Route
              path="dashboard/product/edit/:id"
              element={<DashboardEditProduct />}
            />
            <Route
              path="dashboard/product/create"
              element={<DashboardCreateProduct />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

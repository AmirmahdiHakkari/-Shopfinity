// import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./layout/Navbar";
// import Login from "./pages/Login-Page";
// import LandingPage from "./pages/Landing-Page";
// import ContactPage from "./pages/Contact-Page";
// import AuthChecker from "./hooks/AuthChecker";
// import ProductsPage from "./pages/Products-Page";
// import NotAccessPage from "./pages/Not-Access-Page";
// import AboutPage from "./pages/About-Page";
// import ForgotPassword from "./pages/Forgot-pass-Page";
// import BasketPage from "./pages/Basket-Page";
// import CheckoutPage from "./pages/Checkout-Page";
// import NotFoundPage from "./pages/Not-Found-Page";

// export default function AppRoutes() {
//   const location = useLocation();
//   const homeNotLogin = location.pathname === "/";
//   const notAccess = location.pathname === "/NotAccess";

//   return (
//     <>
//       {!homeNotLogin && !notAccess ? <Navbar /> : null}
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/Contact" element={<ContactPage />} />
//         <Route element={<AuthChecker />}>
//           <Route path="/products" element={<ProductsPage />} />
//         </Route>
//         <Route path="/NotAccess" element={<NotAccessPage />} />
//         <Route path="/About" element={<AboutPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/Basket" element={<BasketPage />} />
//         <Route path="/Checkout" element={<CheckoutPage />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </>
//   );
// }

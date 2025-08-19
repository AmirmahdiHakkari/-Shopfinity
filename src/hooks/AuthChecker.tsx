import { Navigate, Outlet } from "react-router-dom";

const AuthChecker = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return isAuthenticated ? <Outlet /> : <Navigate to="/NotAccess" />;
};

export default AuthChecker;

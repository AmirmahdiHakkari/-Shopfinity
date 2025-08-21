import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import LoginForm from "../components/login/LoginForm";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.login")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "max-w-screen min-h-11/12 flex items-center justify-center px-4 transition",
          isLight ? "bg-gray-100" : "bg-darkBg"
        )}
      >
        <div
          className={clsx(
            " rounded-xl shadow-lg w-full max-w-sm p-6",
            isLight ? "bg-white" : "bg-secondaryDarkBg"
          )}
        >
          <LoginForm />
        </div>
      </div>
    </>
  );
};
export default Login;
// // 'emilys' // // 'emilyspass'

import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/Theme-Context";
import { useContext } from "react";

const LandingButtons = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <>
      <Link
        to="/login"
        className={clsx(
          "px-8 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg transform hover:scale-[1.02]",
          isLight
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            : "bg-gradient-to-r from-[#5D8BF4] to-[#15b0f8]  text-white hover:from-[#457dff] hover:to-[#0083c0]"
        )}
      >
        {t("landingPage.loginButton")}
      </Link>
      <Link
        to="/about"
        className={clsx(
          "px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg",
          isLight
            ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
            : "border border-gray-600 text-gray-200 hover:bg-gray-800"
        )}
      >
        {t("landingPage.learnMoreButton")}
      </Link>
    </>
  );
};

export default LandingButtons;

import clsx from "clsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <div
      dir={dir()}
      className={clsx(
        "min-h-screen flex items-center justify-center p-4 transition-colors duration-500",
        isLight
          ? "bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      )}
    >
      <div
        className={clsx(
          "text-center max-w-2xl backdrop-blur-sm p-8 rounded-3xl shadow-xl",
          isLight ? "bg-white/30" : "bg-gray-900/30"
        )}
      >
        <h1
          className={clsx(
            "text-5xl md:text-6xl font-bold mb-6 p-3 bg-clip-text text-transparent",
            isLight
              ? "bg-gradient-to-r from-purple-600 to-pink-600"
              : "bg-gradient-to-r from-[#5D8BF4] to-[#29B6F6]"
          )}
        >
          {t("Landing-Page-Header")}
        </h1>

        <p
          className={clsx(
            "text-lg mb-8",
            isLight ? "text-gray-700" : "text-gray-300"
          )}
        >
          {t("Landing-Page-Subheader")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className={clsx(
              "px-8 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg transform hover:scale-[1.02]",
              isLight
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                : "bg-gradient-to-r from-[#5D8BF4] to-[#15b0f8]  text-white hover:from-[#457dff] hover:to-[#0083c0]"
            )}
          >
            {t("Landing-Page-LoginButton")}
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
            {t("Landing-Page-LearnMoreButton")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import clsx from "clsx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../context/Theme-Context";
import LandingButtons from "../../components/Landing/LandingButton";

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.landing")}</title>
      </Helmet>

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
            {t("landingPage.header")}
          </h1>

          <p
            className={clsx(
              "text-lg mb-8",
              isLight ? "text-gray-700" : "text-gray-300"
            )}
          >
            {t("landingPage.subheader")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <LandingButtons />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

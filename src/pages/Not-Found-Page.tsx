import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";

const NotFoundPage = () => {
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
        "flex flex-col items-center justify-center min-h-11/12 text-center px-4 transition",
        isLight ? "bg-gray-100 text-gray-800" : "bg-darkBg text-gray-100"
      )}
    >
      <h1 className="text-7xl font-extrabold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">
        {t("notFoundPage.header")}
      </h2>
      <p className="mt-2 max-w-md">{t("notFoundPage.description")}</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-lg shadow transition font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {t("notFoundPage.goHome")}
      </Link>
    </div>
  );
};

export default NotFoundPage;

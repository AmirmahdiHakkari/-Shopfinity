import { FaLock } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import NotAccessButtons from "../components/not access/NotAccessButtons";

const NotAccessPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.Not-Access")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "min-h-screen flex flex-col items-center justify-center p-6",
          isLight ? "bg-gray-100 text-gray-800" : "bg-darkBg text-gray-200"
        )}
      >
        <div
          className={clsx(
            "max-w-md w-full rounded-xl shadow-2xl overflow-hidden border",
            isLight
              ? "bg-white border-gray-200"
              : "bg-secondaryDarkBg border-[#2A3645]"
          )}
        >
          <div
            className={clsx(
              "p-6 flex items-center gap-4",
              isLight ? "bg-gray-100" : "bg-[#2A3645]"
            )}
          >
            <div
              className={clsx(
                "p-3 rounded-full",
                isLight
                  ? "bg-red-100 text-red-600"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              <FaLock className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {t("notAccessPage.header")}
              </h1>
              <p
                className={clsx(
                  "text-sm mt-1",
                  isLight ? "text-gray-600" : "text-gray-400"
                )}
              >
                {t("notAccessPage.subheader")}
              </p>
            </div>
          </div>

          <div className={clsx("p-8")}>
            <div className="space-y-4">
              <p className={clsx(isLight ? "text-gray-700" : "text-gray-300")}>
                {t("notAccessPage.description")}
              </p>
              <NotAccessButtons />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "mt-8 text-sm",
            isLight ? "text-gray-500" : "text-gray-500"
          )}
        >
          {t("notAccessPage.needHelp")}
          <span className={clsx(isLight ? "text-blue-600" : "text-[#29B6F6]")}>
            support@example.com
          </span>
        </div>
      </div>
    </>
  );
};

export default NotAccessPage;

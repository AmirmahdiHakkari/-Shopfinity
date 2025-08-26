import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import { useTranslation } from "react-i18next";
import DashboardProductsTable from "../../components/dashboard/DashboardProductsTable";
import { Helmet } from "react-helmet-async";

const DashboardProducts = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.dashboard.products")}</title>
      </Helmet>

      <div
        className={clsx(
          "max-w-screen md:min-w-full min-h-11/12 p-4 transition flex flex-col items-center",
          isLight ? "bg-gray-100" : "bg-darkBg"
        )}
      >
        <h1
          className={clsx(
            "min-w-full text-xl font-bold mb-36",
            isLight ? "text-gray-800" : "text-white"
          )}
        >
          {t("dashboard.product.header")}
        </h1>

        <DashboardProductsTable />
      </div>
    </>
  );
};
export default DashboardProducts;

import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import ProductCreateForm from "../../components/dashboard/ProductCreateForm";
import { Helmet } from "react-helmet-async";

const DashboardCreateProduct = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.dashboard.productCreate")}</title>
      </Helmet>

      <div
        className={clsx(
          "max-w-screen md:min-w-full min-h-11/12 p-4 transition flex flex-col items-center",
          isLight ? "bg-gray-100" : "bg-darkBg"
        )}
      >
        <div
          className={clsx(
            "w-10/12 mx-auto p-6 rounded-xl shadow mt-6 transition",
            isLight ? "bg-white text-black" : "bg-secondaryDarkBg text-white"
          )}
        >
          <h1 className="text-2xl font-bold mb-6">
            {t("dashboard.createProduct.header")}
          </h1>

          <ProductCreateForm />
        </div>
      </div>
    </>
  );
};
export default DashboardCreateProduct;

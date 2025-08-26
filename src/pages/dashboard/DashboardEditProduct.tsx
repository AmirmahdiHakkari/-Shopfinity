import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../context/Theme-Context";
import clsx from "clsx";
import type { ProductType } from "../../types";
import ProductEditForm from "../../components/dashboard/ProductEditForm";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const DashboardEditProduct = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get<ProductType>(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.dashboard.productEdit")}</title>
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
          {loading ? (
            <div
              className={clsx(
                "bg-transparent h-[500px] flex items-center justify-center rounded-xl transition"
              )}
            >
              <div className="w-24 h-24 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : !product ? (
            <p className="text-center mt-10">
              {t("dashboard.editProduct.productNotFound")}
            </p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6">
                {t("dashboard.editProduct.header")}
              </h1>

              <ProductEditForm product={product} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default DashboardEditProduct;

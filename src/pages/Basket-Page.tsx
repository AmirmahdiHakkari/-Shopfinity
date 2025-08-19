import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import ProductItem from "../components/product-Item";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import BasketSideBar from "../components/Baket-Sidebar";
import { Helmet } from "react-helmet-async";

const BasketPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const productsInCart = useSelector((state: RootState) => state.cart);

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.basket")}</title>
      </Helmet>
      <div
        dir={dir()}
        className={clsx(
          "min-h-screen transition p-6 md:p-10 gap-6 grid grid-cols-1 md:grid-cols-[280px_1fr]",
          isLight ? "bg-gray-50" : "bg-[#141A21]"
        )}
      >
        <BasketSideBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsInCart.length > 0 ? (
            productsInCart.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div
              className={clsx(
                "col-span-full flex flex-col items-center justify-center p-10 rounded-xl",
                isLight
                  ? "border-gray-300 bg-gray-50 text-gray-700"
                  : "border-gray-600 bg-[#1C252E] text-gray-300"
              )}
            >
              <svg
                className="w-16 h-16 mb-4 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2L17 13M7 13H5.4M17 13l1.6 8M9 21h6"
                />
              </svg>
              <p className="text-lg font-semibold mb-2">
                {t("basketPage.empty.header")}
              </p>
              <p className="text-sm text-gray-400 text-center">
                {t("basketPage.empty.subheader")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketPage;

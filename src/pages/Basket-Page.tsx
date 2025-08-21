import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import ProductItem from "../components/product/product-Item";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import BasketSideBar from "../components/basket/Baket-Sidebar";
import { Helmet } from "react-helmet-async";
import BasketEmpty from "../components/basket/Basket-empty";

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
          isLight ? "bg-gray-50" : "bg-darkBg"
        )}
      >
        <BasketSideBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsInCart.length > 0 ? (
            productsInCart.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <BasketEmpty />
          )}
        </div>
      </div>
    </>
  );
};

export default BasketPage;

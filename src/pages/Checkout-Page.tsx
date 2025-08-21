import { useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { ThemeContext } from "../context/Theme-Context";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import ProductsInCartItem from "../components/checkout/productsInCartItem";
import CheckoutForm from "../components/checkout/CheckoutForm";

const CheckoutPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const productsInCart = useSelector((state: RootState) => state.cart);

  const totalPrice = productsInCart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.checkout")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "p-6 md:p-10 grid gap-8 md:grid-cols-[1fr_2fr] transition min-h-11/12",
          isLight ? "bg-gray-50 text-gray-900" : "bg-darkBg text-white"
        )}
      >
        <div
          className={clsx(
            "rounded-xl shadow-sm p-6 h-fit",
            isLight ? "bg-white" : "bg-secondaryDarkBg"
          )}
        >
          <h2 className="text-2xl font-bold mb-4">
            {t("checkoutPage.orderSummary")}
          </h2>
          {productsInCart.length === 0 ? (
            <p className="text-gray-400">{t("basket-Page-Empty-Header")}</p>
          ) : (
            <div className="space-y-3">
              {productsInCart.map((product) => (
                <ProductsInCartItem product={product} />
              ))}
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>{t("basketPage.sidebar.total")}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div
          className={clsx(
            "h-fit rounded-xl shadow-sm p-6",
            isLight ? "bg-white" : "bg-secondaryDarkBg"
          )}
        >
          <CheckoutForm />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

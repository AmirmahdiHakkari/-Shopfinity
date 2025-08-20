import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BasketSideBar = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const productsInCart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const totalPrice = productsInCart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <div
      dir={dir()}
      className={clsx(
        "h-full w-full rounded-xl p-4 font-semibold transition shadow-sm flex flex-col",
        isLight ? "bg-white text-gray-900" : "bg-secondaryDarkBg text-white"
      )}
    >
      <h1 className="text-2xl flex items-center mb-4">
        {t("basketPage.sidebar.header")}
        <FaShoppingCart className="mr-2 w-6 h-6" />
      </h1>

      <div className="flex-1 overflow-y-auto space-y-4">
        {productsInCart.length === 0 ? (
          <div
            dir={dir()}
            className={clsx(
              "flex flex-col items-center justify-center p-6 rounded-xl border-2",
              isLight
                ? "border-gray-300 bg-gray-50 text-gray-700"
                : "border-gray-600 bg-secondaryDarkBg text-gray-300"
            )}
          >
            <FaShoppingCart className="w-12 h-12 mb-4 text-indigo-500" />
            <p className="text-lg font-semibold mb-2">
              {t("basketPage.empty.header")}
            </p>
            <p className="text-sm text-center text-gray-400">
              {t("basketPage.empty.subheader")}
            </p>
          </div>
        ) : (
          productsInCart.map((product) => (
            <div key={product.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-gray-400">
                  {product.quantity} × ${product.price} = $
                  {product.quantity! * product.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {productsInCart.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="text-lg font-bold">
            {t("basketPage.sidebar.total")} ${totalPrice.toFixed(2)}
          </p>
          <button
            className="w-full mt-2 py-2 rounded-lg font-semibold transition cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => navigate("/Checkout")}
          >
            {t("basketPage.sidebar.checkout")}
          </button>
        </div>
      )}
    </div>
  );
};

export default BasketSideBar;

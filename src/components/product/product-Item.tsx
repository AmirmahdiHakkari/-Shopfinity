import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import clsx from "clsx";
import type { ProductCardProps, ProductType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { t } from "i18next";
import { addToCart, decreaseQuantity } from "../../redux/cart/cartSlice";

const ProductItem = ({ product }: ProductCardProps) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  
  const dispatch = useDispatch();

  const basketItem = useSelector((state: RootState) =>
    state.cart.find((item: ProductType) => item.id === product.id)
  );

  return (
    <div
      key={product.id}
      className={clsx(
        "group rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-2 flex flex-col justify-between max-h-[550px]",
        isLight ? "bg-white" : "bg-secondaryDarkBg"
      )}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
          ${product.price}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2
            className={clsx(
              "text-lg font-bold ",
              isLight ? "text-gray-900" : "text-white"
            )}
          >
            {product.title}
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-sm">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>
        {basketItem ? (
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => dispatch(decreaseQuantity(product.id))}
              className="w-10 h-10 bg-indigo-600 text-white rounded-sm cursor-pointer text-2xl transition hover:bg-indigo-700"
            >
              -
            </button>
            <span
              className={clsx(
                "font-semibold text-xl transition",
                isLight ? " text-gray-700" : "text-white"
              )}
            >
              {basketItem.quantity}
            </span>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="w-10 h-10 bg-indigo-600 text-white rounded-sm cursor-pointer text-2xl transition hover:bg-indigo-700"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="w-full py-2.5 cursor-pointer bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors duration-300 flex items-center justify-center gap-2"
            onClick={() => dispatch(addToCart(product))}
          >
            {t("productsPage.addToCart")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;

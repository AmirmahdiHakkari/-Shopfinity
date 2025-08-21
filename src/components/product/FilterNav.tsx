import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../redux/store";
import type { FilterNavProps, ProductType } from "../../types";
import clsx from "clsx";
import { ThemeContext } from "../../context/Theme-Context";

const FilterNav = ({
  categories,
  setSelectedCategory,
  selectedCategory,
}: FilterNavProps) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const productsInCartCount = useSelector((state: RootState) =>
    state.cart.reduce(
      (total: number, item: ProductType) => total + (item.quantity || 1),
      0
    )
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={clsx(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-8 py-3 border-b sticky top-0 z-40 shadow",
          isLight
            ? scrolled
              ? "bg-[#ffffff7d] backdrop-blur-sm text-gray-800 border-gray-200"
              : "bg-gray-50 border-gray-200"
            : scrolled
            ? "bg-[#1c252e6b] backdrop-blur-sm text-white border-gray-700"
            : "bg-gray-800 border-gray-700 text-white"
        )}
      >
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition cursor-pointer",
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : isLight
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-700 hover:bg-gray-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex justify-center sm:justify-end">
          <Link to="/Basket" className="relative cursor-pointer">
            <FaShoppingCart className="text-2xl" />
            {productsInCartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {productsInCartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default FilterNav;

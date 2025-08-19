import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/Theme-Context";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa";
import ProductItem from "../components/product-Item";
import type { ProductType } from "../types/index";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const productsInCartCount = useSelector((state: RootState) =>
    state.cart.reduce(
      (total: number, item: ProductType) => total + (item.quantity || 1),
      0
    )
  );

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    t("productsPage.filter.All")
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const uniqueCats = [
      t("productsPage.filter.all"),
      t("productsPage.filter.beauty"),
      t("productsPage.filter.fragrances"),
      t("productsPage.filter.furniture"),
      t("productsPage.filter.groceries"),
    ];
    setCategories(uniqueCats);

    if (!uniqueCats.includes(selectedCategory)) {
      setSelectedCategory(t("productsPage.filter.All"));
    }
  }, [t]);

  const categoryMap: Record<string, string> = {
    [t("productsPage.filter.all")]: "all",
    [t("productsPage.filter.beauty")]: "beauty",
    [t("productsPage.filter.fragrances")]: "fragrances",
    [t("productsPage.filter.furniture")]: "furniture",
    [t("productsPage.filter.groceries")]: "groceries",
  };

  const filteredProducts =
    selectedCategory === t("productsPage.filter.all")
      ? products
      : products.filter((p) => p.category === categoryMap[selectedCategory]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isLight ? "bg-gray-50" : "bg-[#141A21]"
        }`}
      >
        <div className="w-24 h-24 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.products")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "min-h-screen transition",
          isLight ? "from-gray-50 to-gray-100" : "bg-[#141A21]"
        )}
      >
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

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;

import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { ThemeContext } from "../../context/Theme-Context";
import type { ProductType } from "../../types";
import FilterNav from "../../components/product/FilterNav";
import ProductItem from "../../components/product/product-Item";

const ProductsPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    t("productsPage.filter.all")
  );

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

  useEffect(() => {
    axios
      .get<{ products: ProductType[] }>("https://dummyjson.com/products")
      .then((res) => {
        console.log(res);

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
      setSelectedCategory(t("productsPage.filter.all"));
    }
  }, [t, selectedCategory]);

  if (loading) {
    return (
      <div className="bg-transparent min-h-screen flex items-center justify-center ">
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
          "min-h-11/12 transition",
          isLight ? "bg-gray-100" : "bg-darkBg"
        )}
      >
        <FilterNav
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
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

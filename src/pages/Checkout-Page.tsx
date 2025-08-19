import { useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { ThemeContext } from "../context/Theme-Context";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CheckoutFormType } from "../types";
import { Helmet } from "react-helmet-async";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormType>();

  const onSubmit: SubmitHandler<CheckoutFormType> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.checkout")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "p-6 md:p-10 grid gap-8 md:grid-cols-[1fr_2fr] transition min-h-[837px]",
          isLight ? "bg-gray-50 text-gray-900" : "bg-[#141A21] text-white"
        )}
      >
        <div
          className={clsx(
            "rounded-xl shadow-sm p-6 h-fit",
            isLight ? "bg-white" : "bg-[#1C252E]"
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
                <div
                  key={product.id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <span>{product.title}</span>
                  <span>
                    {product.quantity} × ${product.price}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>{t("basket-Page-Sidebar-Total")}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div
          className={clsx(
            "h-fit rounded-xl shadow-sm p-6",
            isLight ? "bg-white" : "bg-[#1C252E]"
          )}
        >
          <h2 className="text-2xl font-bold mb-4">
            {t("checkoutPage.form.header")}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block font-semibold mb-1">
                {t("checkoutPage.form.name")}
              </label>
              <input
                type="text"
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold",
                  isLight
                    ? "border-gray-300 text-gray-900 "
                    : "border-gray-600 text-white bg-[#1C252E]",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.Name && isLight,
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.Name && !isLight,
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.Name,
                  }
                )}
                {...register("Name", {
                  required: t("checkoutPage.form.nameRequiredError"),
                  minLength: {
                    value: 3,
                    message: t("checkoutPage.form.nameMinLengthError"),
                  },
                  maxLength: {
                    value: 25,
                    message: t("checkoutPage.form.nameMaxLengthError"),
                  },
                })}
              />
              {errors.Name && (
                <span className="text-red-600 font-semibold">
                  {errors.Name.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">
                {t("checkoutPage.form.email")}
              </label>
              <input
                type="email"
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold",
                  isLight
                    ? "border-gray-300 text-gray-900 "
                    : "border-gray-600 text-white bg-[#1C252E]",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.Email && isLight,
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.Email && !isLight,
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.Email,
                  }
                )}
                {...register("Email", {
                  required: t("checkoutPage.form.emailRequiredError"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("checkoutPage.form.emailInvalidError"),
                  },
                })}
              />
              {errors.Email && (
                <span className="text-red-600 font-semibold">
                  {errors.Email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">
                {t("checkoutPage.form.address")}
              </label>
              <textarea
                rows={3}
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold",
                  isLight
                    ? "border-gray-300 text-gray-900 "
                    : "border-gray-600 text-white bg-[#1C252E]",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.Address && isLight,
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.Address && !isLight,
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.Address,
                  }
                )}
                {...register("Address", {
                  required: t("checkoutPage.form.addressRequiredError"),
                  minLength: {
                    value: 3,
                    message: t("checkoutPage.form.addressMinLengthError"),
                  },
                })}
              />
              {errors.Address && (
                <span className="text-red-600 font-semibold">
                  {errors.Address.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {t("checkoutPage.orderRegistration")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

import { useForm, type SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import type { CheckoutFormType } from "../../types";
import { useTranslation } from "react-i18next";

const CheckoutForm = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

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
                : "border-gray-600 text-white",
              {
                "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                  errors.Name && isLight,
                "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
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
                ? "border-gray-300 text-gray-900"
                : "border-gray-600 text-white",
              {
                "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                  errors.Email && isLight,
                "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
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
                : "border-gray-600 text-white",
              {
                "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                  errors.Address && isLight,
                "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
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
          className="w-full py-3 cursor-pointer rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {t("checkoutPage.orderRegistration")}
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;

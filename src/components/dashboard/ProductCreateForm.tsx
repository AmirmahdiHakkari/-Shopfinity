import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import clsx from "clsx";
import type { FormValues } from "../../types";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCreateForm = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  const isLTR = dir() === "ltr";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onsubmit = (data: FormValues) => {
    setCreating(true);
    setTimeout(() => {
      console.log(data);
      setCreating(false);
      toast.success(t("dashboard.createProduct.form.toast.changesSaved"), {
        position: isLTR ? "top-right" : "top-left",
        style: {
          background: isLight ? "#f9fafb" : "#1C252E",
          color: isLight ? "#000000" : "#ffffff",
        },
      });
      navigate("/dashboard/Products");
    }, 3000);
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleSubmit(onsubmit)}
    >
      <div>
        <label className="block mb-1 font-semibold">
          {t("dashboard.createProduct.form.title")}
        </label>
        <input
          disabled={creating}
          type="text"
          {...register("title", {
            required: t("dashboard.createProduct.form.titleRequiredError"),
            minLength: {
              value: 3,
              message: t("dashboard.createProduct.form.titleMinLengthError"),
            },
            maxLength: {
              value: 35,
              message: t("dashboard.createProduct.form.titleMaxLengthError"),
            },
          })}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.title && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.title && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.title,
            }
          )}
        />
        {errors.title && (
          <h1 className="text-red-600 font-semibold">{errors.title.message}</h1>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">
          {t("dashboard.createProduct.form.price")}
        </label>
        <input
          type="number"
          minLength={0}
          disabled={creating}
          {...register("price", {
            required: t("dashboard.createProduct.form.priceRequiredError"),
          })}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.price && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.price && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.price,
            }
          )}
        />
        {errors.price && (
          <h1 className="text-red-600 font-semibold">{errors.price.message}</h1>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">
          {t("dashboard.createProduct.form.category")}
        </label>
        <input
          type="text"
          disabled={creating}
          {...register("category", {
            required: t("dashboard.createProduct.form.categoryRequiredError"),
            minLength: {
              value: 3,
              message: t("dashboard.createProduct.form.categoryMinLengthError"),
            },
            maxLength: {
              value: 15,
              message: t("dashboard.createProduct.form.categoryMaxLengthError"),
            },
          })}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.category && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.category && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.category,
            }
          )}
        />
        {errors.category && (
          <h1 className="text-red-600 font-semibold">
            {errors.category.message}
          </h1>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">
          {t("dashboard.createProduct.form.stock")}
        </label>
        <input
          type="number"
          minLength={0}
          disabled={creating}
          {...register("stock", {
            required: t("dashboard.createProduct.form.stockRequiredError"),
          })}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.stock && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.stock && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.stock,
            }
          )}
        />
        {errors.stock && (
          <h1 className="text-red-600 font-semibold">{errors.stock.message}</h1>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="block mb-1 font-semibold">
          {t("dashboard.createProduct.form.description")}
        </label>
        <textarea
          disabled={creating}
          {...register("description", {
            required: t(
              "dashboard.createProduct.form.descriptionRequiredError"
            ),
            minLength: {
              value: 3,
              message: t(
                "dashboard.createProduct.form.descriptionMinLengthError"
              ),
            },
          })}
          className={clsx(
            "w-full px-3 py-2 rounded-md border outline-none h-28 transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.description && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.description && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.description,
            }
          )}
        />
        {errors.description && (
          <h1 className="text-red-600 font-semibold">
            {errors.description.message}
          </h1>
        )}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className={clsx(
            "px-4 py-2 bg-indigo-700 text-white rounded-md cursor-pointer ",
            creating ? "opacity-50" : "opacity-100"
          )}
        >
          {creating
            ? t("dashboard.createProduct.form.creatingButtonButton")
            : t("dashboard.createProduct.form.createButton")}
        </button>
      </div>
    </form>
  );
};

export default ProductCreateForm;

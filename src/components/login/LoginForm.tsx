import clsx from "clsx";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/Theme-Context";
import { useForm } from "react-hook-form";
import type { dataLoginType } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<dataLoginType>();

  const onSubmit = async (data: dataLoginType) => {
    setLoading(true);
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", data);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      navigate("/dashboard/overview");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <h2
        className={clsx(
          "text-2xl font-bold mb-6 text-center",
          isLight ? "text-gray-900" : "text-white"
        )}
      >
        {t("loginPage.header")}
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder={t("loginPage.form.usernamePlace")}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900 "
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.username && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.username && !isLight,
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.username,
            }
          )}
          {...register("username", {
            required: t("loginPage.form.usernameRequiredError"),
            minLength: {
              value: 3,
              message: t("loginPage.form.usernameMinLengthError"),
            },
            maxLength: {
              value: 15,
              message: t("loginPage.form.usernameMaxLengthError"),
            },
          })}
        />
        {errors.username && (
          <h1 className="text-red-600 font-semibold">
            {errors.username.message}
          </h1>
        )}
        <input
          type="password"
          placeholder={t("loginPage.form.passwordPlace")}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",

            errors.password &&
              (isLight
                ? "bg-red-100 ring-2 ring-red-600 text-gray-900 outline-none"
                : "bg-red-500/80 ring-2 ring-red-600 text-white outline-none"),

            !errors.password &&
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          )}
          {...register("password", {
            required: t("loginPage.form.passwordRequiredError"),
            minLength: {
              value: 3,
              message: t("loginPage.form.passwordMinLengthError"),
            },
            maxLength: {
              value: 15,
              message: t("loginPage.form.passwordMaxLengthError"),
            },
          })}
        />
        {errors.password && (
          <h1 className="text-red-600 font-semibold">
            {errors.password.message}
          </h1>
        )}
        <Link
          to="/forgot-password"
          className="text-sm font-bold transition text-indigo-600 hover:text-indigo-500"
        >
          {t("loginPage.form.forgotPassword")}
        </Link>
        <button
          type="submit"
          disabled={loading}
          className={clsx(
            "w-full py-2 rounded-lg text-white font-medium transition cursor-pointer mt-5",
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          )}
        >
          {loading ? t("loginPage.form.loading") : t("loginPage.form.login")}
        </button>
        {loading && (
          <div className="flex justify-center mt-3">
            <div className="w-6 h-6 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
          </div>
        )}
      </form>
    </>
  );
};

export default LoginForm;

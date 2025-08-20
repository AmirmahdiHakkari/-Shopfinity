import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/Theme-Context";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import type { ForgotPasswordType } from "../types";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const navigate = useNavigate();

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [timer, setTimer] = useState(4);

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setTimer(4);
    }, 2000);
  };

  useEffect(() => {
    if (!sent) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setSent(false);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      navigate("/Login");
    };
  }, [sent]);

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.forgot-Password")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "min-h-11/12 flex items-center justify-center px-4 transition",
          isLight ? "bg-gray-100" : "bg-darkBg"
        )}
      >
        <div
          className={clsx(
            "rounded-xl shadow-lg w-full max-w-sm p-6",
            isLight ? "bg-white" : "bg-secondaryDarkBg"
          )}
        >
          <h2
            className={clsx(
              "text-2xl font-bold mb-6 text-center",
              isLight ? "text-gray-900" : "text-white"
            )}
          >
            {t("forgotPassPage.header")}
          </h2>

          {sent ? (
            <div
              className={clsx(
                "text-center font-medium mb-6",
                isLight ? "text-green-600" : "text-green-400"
              )}
            >
              <p>{t("forgotPassPage.form.submit")}</p>
              {sent && (
                <p className="mt-4">{t("forgotPassPage.form.timer") + timer}</p>
              )}
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                placeholder={t("forgotPassPage.form.emailPlace")}
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold",
                  isLight
                    ? "border-gray-300 text-gray-900 "
                    : "border-gray-600 text-white bg-secondaryDarkBg",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.email && isLight,
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.email && !isLight,
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.email,
                  }
                )}
                {...register("email", {
                  required: t("forgotPassPage.form.emailRequiredError"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("forgotPassPage.form.emailInvalidError"),
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 font-semibold">
                  {errors.email.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={clsx(
                  "w-full py-2 rounded-lg text-white font-medium transition cursor-pointer mt-5",
                  loading
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                )}
              >
                {loading
                  ? t("forgotPassPage.form.sending")
                  : t("forgotPassPage.form.send")}
              </button>
              {loading && (
                <div className="flex justify-center mt-3">
                  <div className="w-6 h-6 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
                </div>
              )}
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className={clsx(
                "text-sm font-bold transition",
                isLight
                  ? "text-indigo-600 hover:text-indigo-500"
                  : "text-indigo-500 hover:text-indigo-400"
              )}
            >
              {t("forgotPassPage.form.back")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

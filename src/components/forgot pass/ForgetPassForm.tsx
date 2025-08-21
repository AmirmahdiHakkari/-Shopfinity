import { useForm } from "react-hook-form";
import type { ForgotPasswordType } from "../../types";
import { useContext, useState } from "react";
import clsx from "clsx";
import { ThemeContext } from "../../context/Theme-Context";
import { useTranslation } from "react-i18next";

type Props = {
  setSent: React.Dispatch<React.SetStateAction<boolean>>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
};

const ForgotPassForm = ({ setSent, setTimer }: Props) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>();

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setTimer(4);
    }, 2000);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder={t("forgotPassPage.form.emailPlace")}
        className={clsx(
          "w-full px-4 py-2 border rounded-lg transition font-semibold",
          isLight
            ? "border-gray-300 text-gray-900 "
            : "border-gray-600 text-white",
          {
            "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
              errors.email && isLight,
            "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
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
        <p className="text-red-600 font-semibold">{errors.email.message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={clsx(
          "w-full py-2 rounded-lg text-white font-medium transition cursor-pointer mt-5",
          loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
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
  );
};

export default ForgotPassForm;

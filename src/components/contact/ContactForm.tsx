import { useForm } from "react-hook-form";
import type { ContactFormType } from "../../types";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const ContactForm = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContactFormType) => {
    setLoading(true);
    try {
      console.log("Form data:", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">
        {t("contactPage.form.header")}
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder={t("contactPage.form.namePlace")}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.name && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.name && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.name,
            }
          )}
          {...register("name", {
            required: t("contactPage.form.nameRequiredError"),
            minLength: {
              value: 3,
              message: t("contactPage.form.nameMinLengthError"),
            },
            maxLength: {
              value: 15,
              message: t("contactPage.form.nameMaxLengthError"),
            },
          })}
        />
        {errors.name && (
          <h1 className="text-red-600 font-semibold">{errors.name.message}</h1>
        )}

        <input
          type="email"
          placeholder={t("contactPage.form.emailPlace")}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.email && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.email && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.email,
            }
          )}
          {...register("email", {
            required: t("contactPage.form.emailRequiredError"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("contactPage.form.emailInvalidError"),
            },
          })}
        />
        {errors.email && (
          <h1 className="text-red-600 font-semibold">{errors.email.message}</h1>
        )}

        <input
          type="text"
          placeholder={t("contactPage.form.subjectPlace")}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.subject && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.subject && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.subject,
            }
          )}
          {...register("subject", {
            required: t("contactPage.form.subjectRequiredError"),
            minLength: {
              value: 3,
              message: t("contactPage.form.subjectMinLengthError"),
            },
            maxLength: {
              value: 15,
              message: t("contactPage.form.subjectMaxLengthError"),
            },
          })}
        />
        {errors.subject && (
          <h1 className="text-red-600 font-semibold">
            {errors.subject.message}
          </h1>
        )}

        <textarea
          placeholder={t("contactPage.form.messagePlace")}
          rows={5}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition font-semibold resize-none",
            isLight
              ? "border-gray-300 text-gray-900"
              : "border-gray-600 text-white",
            {
              "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                errors.message && isLight,
              "bg-red-500/80 ring-2 ring-red-600 !text-white outline-none":
                errors.message && theme === "dark",
              "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                !errors.message,
            }
          )}
          {...register("message", {
            required: t("contactPage.form.messageRequiredError"),
            minLength: {
              value: 5,
              message: t("contactPage.form.messageMinLengthError"),
            },
          })}
        />
        {errors.message && (
          <h1 className="text-red-600 font-semibold">
            {errors.message.message}
          </h1>
        )}

        <button
          type="submit"
          disabled={loading}
          className={clsx(
            "w-full py-2 rounded-lg text-white font-medium transition cursor-pointer mt-5",
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          )}
        >
          {loading ? t("contactPage.form.sending") : t("contactPage.form.send")}
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

export default ContactForm;

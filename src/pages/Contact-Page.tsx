import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/Theme-Context";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import type { ContactFormType } from "../types";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

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
    <div
      dir={dir()}
      className={clsx(
        "max-w-screen min-h-[837px]",
        isLight ? "bg-gray-100 text-gray-800" : "bg-[#141A21] text-gray-200"
      )}
    >
      <div
        className={clsx(
          "bg-transparent py-12 px-6 text-center border-b",
          isLight ? "border-gray-200" : "border-[#2A3645]"
        )}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {t("Contact-Page-Header")}
        </h1>
      </div>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div
                className={clsx(
                  "p-3 rounded-full mt-1",
                  isLight
                    ? "bg-blue-100 text-blue-600"
                    : "bg-[#2962FF]/10 text-[#2962FF]"
                )}
              >
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("Contact-Page-Email")}
                </h3>
                <p className={isLight ? "text-gray-600" : "text-gray-400"}>
                  support@mystore.com
                </p>
                <p className={isLight ? "text-gray-600" : "text-gray-400"}>
                  sales@mystore.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div
                className={clsx(
                  "p-3 rounded-full mt-1",
                  isLight
                    ? "bg-cyan-100 text-cyan-600"
                    : "bg-[#29B6F6]/10 text-[#29B6F6]"
                )}
              >
                <FaPhone className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("Contact-Page-Call")}
                </h3>
                <p className={isLight ? "text-gray-600" : "text-gray-400"}>
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div
                className={clsx(
                  "p-3 rounded-full mt-1",
                  isLight
                    ? "bg-orange-100 text-orange-600"
                    : "bg-[#FF7043]/10 text-[#FF7043]"
                )}
              >
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("Contact-Page-Visit")}
                </h3>
                <p className={isLight ? "text-gray-600" : "text-gray-400"}>
                  123 Business Avenue
                </p>
                <p className={isLight ? "text-gray-600" : "text-gray-400"}>
                  New York, NY 10001
                </p>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">
                {t("Contact-Page-Follow")}
              </h3>
              <div className="flex gap-4">
                {[
                  {
                    icon: <FaTwitter className="text-xl" />,
                    url: "https://twitter.com/yourprofile",
                    hover: "hover:bg-[#1DA1F2]",
                  },
                  {
                    icon: <FaFacebookF className="text-xl" />,
                    url: "https://facebook.com/yourpage",
                    hover: "hover:bg-[#4267B2]",
                  },
                  {
                    icon: <FaInstagram className="text-xl" />,
                    url: "https://instagram.com/yourprofile",
                    hover:
                      "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045]",
                  },
                  {
                    icon: <FaLinkedinIn className="text-xl" />,
                    url: "https://linkedin.com/yourcompany",
                    hover: "hover:bg-[#0077B5]",
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "p-3 rounded-full transition-all duration-300",
                      isLight
                        ? "bg-gray-200 text-gray-600 hover:text-white"
                        : "bg-[#2A3645] text-gray-300 hover:text-white",
                      item.hover
                    )}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "rounded-xl p-8 border shadow-lg",
              isLight
                ? "bg-white border-gray-200"
                : "bg-[#1C252E] border-[#2A3645]"
            )}
          >
            <h2 className="text-2xl font-bold mb-6">
              {t("Contact-Page-Form-Header")}
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder={t("Contact-Page-Form-Name-place")}
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold",
                  theme === "light"
                    ? "border-gray-300 text-gray-900"
                    : "border-gray-600 text-white bg-[#1C252E]",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.name && theme === "light",
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.name && theme === "dark",
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.name,
                  }
                )}
                {...register("name", {
                  required: t("Contact-Page-Form-Name-required-error"),
                  minLength: {
                    value: 3,
                    message: t("Contact-Page-Form-Name-minLength-error"),
                  },
                  maxLength: {
                    value: 15,
                    message: t("Contact-Page-Form-Name-maxLength-error"),
                  },
                })}
              />
              {errors.name && (
                <h1 className="text-red-600 font-semibold">
                  {errors.name.message}
                </h1>
              )}

              <input
                type="email"
                placeholder={t("Contact-Page-Form-Email-place")}
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold",
                  theme === "light"
                    ? "border-gray-300 text-gray-900"
                    : "border-gray-600 text-white bg-[#1C252E]",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.email && theme === "light",
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.email && theme === "dark",
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.email,
                  }
                )}
                {...register("email", {
                  required: t("Contact-Page-Form-Email-required-error"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("Contact-Page-Form-Email-Invalid-error"),
                  },
                })}
              />
              {errors.email && (
                <h1 className="text-red-600 font-semibold">
                  {errors.email.message}
                </h1>
              )}

              <input
                type="text"
                placeholder={t("Contact-Page-Form-Subject-place")}
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold",
                  theme === "light"
                    ? "border-gray-300 text-gray-900"
                    : "border-gray-600 text-white bg-[#1C252E]",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.subject && theme === "light",
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.subject && theme === "dark",
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.subject,
                  }
                )}
                {...register("subject", {
                  required: t("Contact-Page-Form-Subject-required-error"),
                  minLength: {
                    value: 3,
                    message: t("Contact-Page-Form-Subject-minLength-error"),
                  },
                  maxLength: {
                    value: 15,
                    message: t("Contact-Page-Form-Subject-maxLength-error"),
                  },
                })}
              />
              {errors.subject && (
                <h1 className="text-red-600 font-semibold">
                  {errors.subject.message}
                </h1>
              )}

              <textarea
                placeholder={t("Contact-Page-Form-Message-place")}
                rows={5}
                className={clsx(
                  "w-full px-4 py-2 border rounded-lg transition font-semibold resize-none",
                  theme === "light"
                    ? "border-gray-300 text-gray-900"
                    : "border-gray-600 text-white bg-[#1C252E]",
                  {
                    "bg-red-100 ring-2 ring-red-600 !text-gray-900 outline-none":
                      errors.message && theme === "light",
                    "bg-blue-900/80 ring-2 ring-blue-600 !text-white outline-none":
                      errors.message && theme === "dark",
                    "focus:ring-2 focus:ring-indigo-400 focus:outline-none":
                      !errors.message,
                  }
                )}
                {...register("message", {
                  required: t("Contact-Page-Form-Message-required-error"),
                  minLength: {
                    value: 5,
                    message: t("Contact-Page-Form-Message-minLength-error"),
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
                  loading
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                )}
              >
                {loading
                  ? t("Contact-Page-Form-Sending")
                  : t("Contact-Page-Form-Send")}
              </button>

              {loading && (
                <div className="flex justify-center mt-3">
                  <div className="w-6 h-6 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

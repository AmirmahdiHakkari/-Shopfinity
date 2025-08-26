import { useContext } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../context/Theme-Context";
import ContactForm from "../../components/contact/ContactForm";
import ContactAddress from "../../components/contact/ContactAddress";
import SocialMedias from "../../components/contact/SocialMedias";

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.contact")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "max-w-screen min-h-11/12",
          isLight ? "bg-gray-100 text-gray-800" : "bg-darkBg text-gray-200"
        )}
      >
        <div
          className={clsx(
            "bg-transparent py-12 px-6 text-center border-b",
            isLight ? "border-gray-200" : "border-[#2A3645]"
          )}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t("contactPage.header")}
          </h1>
        </div>
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <ContactAddress />
              <div className="pt-4">
                <SocialMedias />
              </div>
            </div>
            <div
              className={clsx(
                "rounded-xl p-8 border shadow-lg",
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-secondaryDarkBg border-[#2A3645]"
              )}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

import clsx from "clsx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { ThemeContext } from "../../context/Theme-Context";
const ContactAddress = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <>
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
            {t("contactPage.email")}
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
            {t("contactPage.call")}
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
            {t("contactPage.visit")}
          </h3>
          <p className={isLight ? "text-gray-600" : "text-gray-400"}>
            123 Business Avenue
          </p>
          <p className={isLight ? "text-gray-600" : "text-gray-400"}>
            New York, NY 10001
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactAddress;

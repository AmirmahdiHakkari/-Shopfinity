import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";

const SocialMedias = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">{t("contactPage.follow")}</h3>
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
    </>
  );
};

export default SocialMedias;

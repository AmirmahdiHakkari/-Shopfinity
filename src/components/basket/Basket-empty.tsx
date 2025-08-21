import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import { useTranslation } from "react-i18next";

const BasketEmpty = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "col-span-full flex flex-col items-center justify-center p-10 rounded-xl",
        isLight
          ? "border-gray-300 bg-gray-50 text-gray-700"
          : "border-gray-600 bg-secondaryDarkBg text-gray-300"
      )}
    >
      <svg
        className="w-16 h-16 mb-4 text-indigo-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2L17 13M7 13H5.4M17 13l1.6 8M9 21h6"
        />
      </svg>
      <p className="text-lg font-semibold mb-2">
        {t("basketPage.empty.header")}
      </p>
      <p className="text-sm text-gray-400 text-center">
        {t("basketPage.empty.subheader")}
      </p>
    </div>
  );
};

export default BasketEmpty;

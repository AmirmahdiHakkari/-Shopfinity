import clsx from "clsx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/Theme-Context";

const NotAccessButtons = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <>
      <div className="pt-6 flex flex-col sm:flex-row gap-4">
        <Link
          to="/Login"
          className={clsx(
            "flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all text-white",
            isLight
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-[#2962FF] hover:bg-[#2979FF]"
          )}
        >
          <LuLogIn />
          {t("notAccessPage.login")}
        </Link>

        <Link
          to="/contact"
          className={clsx(
            "flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all",
            isLight
              ? "border border-gray-300 text-gray-700 hover:bg-gray-200"
              : "border border-[#2A3645] text-gray-300 hover:bg-[#2A3645]"
          )}
        >
          <FaEnvelope />
          {t("notAccessPage.contact")}
        </Link>
      </div>
    </>
  );
};

export default NotAccessButtons;

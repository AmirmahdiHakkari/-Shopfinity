import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import SidebarButton from "../../components/dashboard/sidebar/SidebarButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  return (
    <>
      {/* بک‌دراپ فقط برای موبایل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        dir={dir()}
        className={clsx(
          "z-50 w-64 max-h-screen p-4 transition-all font-bold shadow md:sticky md:top-0 md:block",
          isLight ? "bg-gray-100" : "bg-darkBg text-gray-400",
          // موبایل
          "fixed top-0 bottom-0",
          dir() === "rtl" ? "right-0" : "left-0",
          isOpen
            ? "translate-x-0"
            : dir() === "rtl"
            ? "translate-x-full"
            : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div
          className={clsx(
            "text-2xl h-1/12 flex justify-between items-center",
            isLight ? "text-gray-800" : "text-white"
          )}
        >
          <h1>{t("dashboard.sidebar.header")}</h1>
          <button className="md:hidden text-2xl" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="w-full h-11/12 flex flex-col p-4">
          <SidebarButton
            to="/dashboard/overview"
            content={t("dashboard.sidebar.pages.overview")}
          />
          <SidebarButton
            to="/dashboard/products"
            content={t("dashboard.sidebar.pages.products")}
          />
          <SidebarButton
            to="/dashboard/product/edit/1"
            content={t("dashboard.sidebar.pages.productEdit")}
            isActiveOverride={(path) =>
              path.startsWith("/dashboard/product/edit")
            }
          />
          <SidebarButton
            to="/dashboard/product/create"
            content={t("dashboard.sidebar.pages.createProduct")}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import { Outlet } from "react-router-dom";
import Sidebar from "./dashboard/Sidebar";
import DashboardNavbar from "./dashboard/DashboardNavbar";
import { ThemeContext } from "../context/Theme-Context";
import { useContext, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function DashboardLayout() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const {
    i18n: { dir },
  } = useTranslation();

  const isLTR = dir() === "ltr";

  return (
    <div
      dir={dir()}
      className={clsx(
        "min-h-screen grid grid-cols-1 md:grid-cols-[300px_1fr]",
        isLight ? "bg-gray-100" : "bg-darkBg"
      )}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main
        className={clsx(
          isLTR ? "border-l border-neutral-600" : "border-r border-neutral-600"
        )}
      >
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        <Outlet />
      </main>
    </div>
  );
}

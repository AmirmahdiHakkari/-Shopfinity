import clsx from "clsx";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../context/Theme-Context";
import type { DashboardSidebarButtonType } from "../../../types";

const SidebarButton = ({
  to,
  content,
  isActiveOverride,
}: DashboardSidebarButtonType) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const customActive = isActiveOverride?.(location.pathname);

  return (
    <NavLink
      to={to}
      end={false}
      className={({ isActive }) =>
        clsx(
          "min-w-full h-12 flex items-center p-3 rounded-md transition mb-5",
          isLight
            ? customActive ?? isActive
              ? "bg-indigo-600 text-white hover:bg-indigo-800"
              : "hover:bg-indigo-900/15"
            : customActive ?? isActive
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "hover:bg-indigo-300/15"
        )
      }
    >
      {content}
    </NavLink>
  );
};

export default SidebarButton;

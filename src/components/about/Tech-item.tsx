import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import type { TechItemProps } from "../../types";

const TechItem = ({ tech }: TechItemProps) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-md transition hover:scale-105 border",
        isLight
          ? "bg-white border-gray-200"
          : "bg-secondaryDarkBg border-gray-600"
      )}
    >
      <div className="text-4xl">{tech.icon}</div>
      <span className="font-semibold">{tech.name}</span>
    </div>
  );
};

export default TechItem;

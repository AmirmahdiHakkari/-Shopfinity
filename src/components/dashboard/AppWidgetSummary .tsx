import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import BarChart from "./chart/BarChart";
import type { AppWidgetSummaryProps } from "../../types";
import { useTranslation } from "react-i18next";

const AppWidgetSummary = ({
  header,
  subheader,
  data,
  cartColor,
}: AppWidgetSummaryProps) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "w-full min-h-full p-4 rounded-xl flex transition shadow",
        isLight ? "bg-white" : "bg-secondaryDarkBg"
      )}
    >
      <div
        className={clsx(
          "w-2/3 font-semibold",
          isLight ? "text-black" : "text-white"
        )}
      >
        <h1 className="font-bold">{header}</h1>
        <p className="mt-5 text-4xl font-bold">{subheader}</p>
      </div>
      <div className="w-1/3 flex items-end">
        <BarChart
          data={data}
          categories={[
            t("dashboard.months.January"),
            t("dashboard.months.February"),
            t("dashboard.months.March"),
            t("dashboard.months.April"),
            t("dashboard.months.May"),
            t("dashboard.months.June"),
            t("dashboard.months.July"),
            t("dashboard.months.August"),
            t("dashboard.months.September"),
            t("dashboard.months.October"),
            t("dashboard.months.November"),
            t("dashboard.months.December"),
          ]}
          color={cartColor}
        />
      </div>
    </div>
  );
};

export default AppWidgetSummary;

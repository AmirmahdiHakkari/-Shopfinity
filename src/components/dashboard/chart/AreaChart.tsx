import React, { useContext } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../context/Theme-Context";

const AreaChart: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  const series = [
    {
      name: t("dashboard.areaChart.income"),
      data: [310, 400, 280, 510, 420, 1009, 1000, 800, 900, 600, 1000, 1500],
    },
    {
      name: t("dashboard.areaChart.expenses"),
      data: [110, 320, 450, 320, 340, 520, 410, 900, 800, 700, 500, 1000],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      foreColor: "#A0AEC0",
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
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
      ],
      axisBorder: {
        color: "#4B5563",
      },
      axisTicks: {
        color: "#4B5563",
      },
    },
    grid: {
      borderColor: "#4B5563",
      strokeDashArray: 5,
    },
    tooltip: {
      theme: "dark",
      shared: true,
      intersect: false,
      style: {
        fontSize: "14px",
      },
      x: {
        show: true,
      },
      y: {
        formatter: (val) => `${val}$`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontWeight: 600,
      fontSize: "14px",
      labels: {
        colors: isLight ? "#000000" : "#ffffff",
      },
      markers: {
        strokeWidth: 0,
        shape: "circle",
        offsetX: -3,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [50, 100],
      },
    },
    colors: ["#00e396", "#008ffb"],
  };

  return (
    <div className="max-w-full h-96">
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="95%"
      />
    </div>
  );
};

export default AreaChart;

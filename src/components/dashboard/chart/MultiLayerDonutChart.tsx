import React, { useContext } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { ThemeContext } from "../../../context/Theme-Context";
import type { MultiLayerDonutChartType } from "../../../types";
import { useTranslation } from "react-i18next";

const MultiLayerDonutChart: React.FC<MultiLayerDonutChartType> = ({
  data,
  labels,
  colors = ["#00C38E", "#FFC700", "#FF6B6B"],
}) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 700,
              color: isLight ? "#000000" : "#ffffff",
            },
            total: {
              show: true,
              label: t("dashboard.saleByGender.labels.Total"),
              fontSize: "16px",
              fontWeight: 700,
              color: isLight ? "#000000" : "#ffffff",
            },
          },
        },
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    labels: labels,
    colors: colors,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 600,
      fontSize: "14px",
      labels: {
        colors: "#fffff",
      },
      markers: {
        strokeWidth: 0,
        shape: "circle",
        offsetX: -3,
      },
    },
  };

  return (
    <div className="max-w-full">
      <Chart options={chartOptions} series={data} type="donut" height={300} />
    </div>
  );
};

export default MultiLayerDonutChart;

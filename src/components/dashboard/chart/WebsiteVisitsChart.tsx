import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useTranslation } from "react-i18next";

const WebsiteVisitsChart: React.FC = () => {
  const { t } = useTranslation();

  const series = [
    {
      name: t("dashboard.websiteVisit.team1"),
      data: [50, 68, 54, 66, 40, 33, 22, 68, 45, 70, 50, 40],
    },
    {
      name: t("dashboard.websiteVisit.team2"),
      data: [50, 32, 46, 34, 60, 67, 78, 42, 55, 30, 50, 60],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
    },
    yaxis: {
      title: {
        text: "Visits",
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
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
    grid: {
      borderColor: "#2D3748",
      row: {
        colors: ["transparent"],
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
      },
      marker: {
        show: true,
      },
      y: {
        formatter: (val) => `${val}`,
        title: {
          formatter: (seriesName) => `${seriesName}:`,
        },
      },
      fillSeriesColor: false,
      custom: undefined,
    },
  };

  return (
    <div className="max-w-full">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default WebsiteVisitsChart;

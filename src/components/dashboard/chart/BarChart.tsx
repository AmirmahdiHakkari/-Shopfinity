import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { BarChartProps } from "../../../types";

const BarChart: React.FC<BarChartProps> = ({
  data,
  categories = [],
  color = "#00C38E",
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      id: "dynamic-bar",
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "60%",
        distributed: false,
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
    xaxis: {
      categories: categories,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
    dataLabels: { enabled: false },
    colors: [color],
  };

  const chartSeries = [
    {
      name: "Values",
      data: data,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width="100%"
        height="70%"
      />
    </div>
  );
};

export default BarChart;

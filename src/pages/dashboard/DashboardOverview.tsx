import clsx from "clsx";
import { ThemeContext } from "../../context/Theme-Context";
import { useContext } from "react";
import AppWidgetSummary from "../../components/dashboard/AppWidgetSummary ";
import { useTranslation } from "react-i18next";
import WebsiteVisitsChart from "../../components/dashboard/chart/WebsiteVisitsChart";
import MultiLayerDonutChart from "../../components/dashboard/chart/MultiLayerDonutChart";
import AreaChart from "../../components/dashboard/chart/AreaChart";
import { Helmet } from "react-helmet-async";

const Overview = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.dashboard.overview")}</title>
      </Helmet>

      <div
        className={clsx(
          "max-w-screen md:min-w-full min-h-11/12 transition p-4",
          isLight ? "bg-gray-100" : "bg-darkBg"
        )}
      >
        <div className="min-w-full min-h-44 gap-5 mb-6 grid grid-cols-1 xl:grid-cols-3">
          <AppWidgetSummary
            header={t("dashboard.summaryHeader.revenues")}
            subheader="$20,000"
            data={[15, 25, 35, 20, 45, 35, 70, 45, 20, 50, 65, 90]}
            cartColor="#00a76f"
          />
          <AppWidgetSummary
            header={t("dashboard.summaryHeader.orders")}
            subheader="5200"
            data={[10, 15, 35, 25, 45, 30, 50, 35, 20, 35, 50, 70]}
            cartColor="#00B8D9"
          />
          <AppWidgetSummary
            header={t("dashboard.summaryHeader.customers")}
            subheader="3100"
            data={[5, 15, 35, 20, 45, 5, 15, 35, 20, 45, 10, 50]}
            cartColor="#FF5630"
          />
        </div>

        <div className="max-w-full min-h-96 gap-5 mb-6 grid grid-cols-1 xl:grid-cols-[1fr_2fr]">
          <div
            className={clsx(
              "max-w-full h-full p-4 rounded-xl shadow transition font-semibold",
              isLight ? "bg-white text-black" : "bg-secondaryDarkBg text-white"
            )}
          >
            <h1 className="font-bold">{t("dashboard.saleByGender.header")}</h1>
            <MultiLayerDonutChart
              data={[1200, 700, 424]}
              labels={[
                t("dashboard.saleByGender.labels.mens"),
                t("dashboard.saleByGender.labels.womens"),
                t("dashboard.saleByGender.labels.kids"),
              ]}
              colors={["#00a76f", "#00B8D9", "#FF5630"]}
            />
          </div>

          <div
            className={clsx(
              "max-w-full h-full p-4 rounded-xl shadow transition font-semibold",
              isLight ? "bg-white text-black" : "bg-secondaryDarkBg text-white"
            )}
          >
            <h1 className="font-bold">{t("dashboard.websiteVisit.header")}</h1>
            <WebsiteVisitsChart />
          </div>
        </div>

        <div
          className={clsx(
            "max-w-full min-h-96 mb-6 rounded-md p-4",
            isLight ? "bg-white" : "bg-secondaryDarkBg "
          )}
        >
          <AreaChart />
        </div>
      </div>
    </>
  );
};

export default Overview;

import React, { useEffect, useState } from "react";
import LineChart from "./components/charts/LineChart";
import BarChart from "./components/charts/BarChart";
import PieChart from "./components/charts/PieChart";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
  pieChartData,
  pieChartOptions,
} from "./variables/charts";
import "./styles.css"; // Make sure the path matches your stylesheet location
import axios from "axios";

function App() {
  const [analytics, setAnalytics] = useState();
  const handleFetchAnalytics = async () => {
    try {
      console.log(process.env);
      const res = await axios.get("http://localhost:5000" + "/api/analytics");
      if (res.status === 200) {
        setAnalytics(res.data);
      }
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleFetchAnalytics();
  }, []);
  return (
    <div className="dashboard">
      <div className="chart-container">
        <div>
          <h1>Intensity</h1>
          <LineChart
            options={{
              ...lineChartOptionsTotalSpent,
              xaxis: {
                ...lineChartOptionsTotalSpent.xaxis,
                categories: analytics?.intensity?.map((item) => item.label),
              },
            }}
            series={[
              // {
              //   name: "Revenue",
              //   data: [50, 64, 48, 66, 49, 68],
              //   color: "#4318FF",
              // },
              {
                name: "Profit",
                data: analytics?.intensity?.map((item) => item.count),
                color: "#6AD2FF",
              },
            ]}
          />
        </div>
      </div>

      <div className="chart-container">
        <div>
          <h1>Relevance</h1>
          <PieChart
            options={{
              ...pieChartOptions,
              labels:
                analytics?.relevance?.length > 0
                  ? analytics?.relevance?.map((item) => item?.label)
                  : [],
            }}
            series={
              analytics?.relevance?.length > 0
                ? analytics?.relevance?.map((item) => item?.count)
                : []
            }
          />
        </div>
      </div>

      <div className="chart-container">
        <div>
          <h1>Year</h1>
          <LineChart
            options={{
              ...lineChartOptionsTotalSpent,
              xaxis: {
                ...lineChartOptionsTotalSpent.xaxis,
                categories: analytics?.year?.map((item) => item.label),
              },
            }}
            series={[
              // {
              //   name: "Revenue",
              //   data: [50, 64, 48, 66, 49, 68],
              //   color: "#4318FF",
              // },
              {
                name: "Profit",
                data: analytics?.year?.map((item) => item.count),
                color: "#6AD2FF",
              },
            ]}
          />
        </div>
      </div>
      <div className="chart-container">
        <div>
          <h1>Likelihood</h1>
          <PieChart
            options={{
              ...pieChartOptions,
              labels:
                analytics?.likelihood?.length > 0
                  ? analytics?.likelihood?.map((item) => item?.label)
                  : [],
            }}
            series={
              analytics?.likelihood?.length > 0
                ? analytics?.likelihood?.map((item) => item?.count)
                : []
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;

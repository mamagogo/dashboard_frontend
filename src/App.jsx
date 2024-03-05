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
  pieChartOptions
} from "./variables/charts";
import "./styles.css"; // Make sure the path matches your stylesheet location
import axios from "axios";

function App() {
  const [analytics, setAnalytics] = useState()
  const handleFetchAnalytics = async () => {
    try {
      console.log(process.env)
      const res = await axios.get("http://localhost:5000" + "/api/analytics")
      if (res.status === 200) {
        setAnalytics(res.data)
      }
      console.log(res.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    handleFetchAnalytics();
  },[]);
  return (
    <div className="dashboard">
      <div className="chart-container">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>

      <div className="chart-container">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>

      <div className="chart-container">
        <LineChart
          options={lineChartOptionsTotalSpent}
          series={lineChartDataTotalSpent}
        />
      </div>

      <div className="chart-container">
        <LineChart
          options={lineChartOptionsTotalSpent}
          series={lineChartDataTotalSpent}
        />
      </div>

      <div className="chart-container">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>

      <div className="chart-container">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>
    </div>
  );
}

export default App;

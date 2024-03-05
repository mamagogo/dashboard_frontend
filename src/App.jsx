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
import ComplexTable from "./components/charts/Table";

function App() {
  const [analytics, setAnalytics] = useState();
  const [blogs, setBlogs] = useState([]);
  const handleFetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000" + "/api/analytics");
      if (res.status === 200) {
        setAnalytics(res.data);
      }
      console.log(res.data);
    } catch (error) {}
  };
  const handleFetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000" + "/api/blogs");
      if (res.status === 200) {
        setBlogs(res.data);
      }
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleFetchAnalytics();
    handleFetchBlogs();
  }, []);
  return (
    <>
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
      <div className="dashboard2">
        <div className="chart-container">
          <ComplexTable
            columnsData={[
              {
                Header: "Country",
                accessor: "label",
              },
              {
                Header: "Count",
                accessor: "count",
              },
            ]}
            tableData={analytics?.country?.length > 0 ? analytics?.country : []}
          />
        </div>
        <div className="chart-container">
          <ComplexTable
            columnsData={[
              {
                Header: "Topics",
                accessor: "label",
              },
              {
                Header: "Count",
                accessor: "count",
              },
            ]}
            tableData={analytics?.topics?.length > 0 ? analytics?.topics : []}
          />
        </div>
        <div className="chart-container">
          <ComplexTable
            columnsData={[
              {
                Header: "Regions",
                accessor: "label",
              },
              {
                Header: "Count",
                accessor: "count",
              },
            ]}
            tableData={analytics?.region?.length > 0 ? analytics?.region : []}
          />
        </div>
      </div>
      <div className="dashboard3">
        <div className="chart-container">
          <ComplexTable
            columnsData={[
              {
                Header: "ID",
                accessor: "_id",
              },
              {
                Header: "End Year",
                accessor: "end_year",
              },
              {
                Header: "Intensity",
                accessor: "intensity",
              },
              {
                Header: "Sector",
                accessor: "sector",
              },
              {
                Header: "Topic",
                accessor: "topic",
              },
              {
                Header: "Insight",
                accessor: "insight",
              },
              {
                Header: "Region",
                accessor: "region",
              },
              {
                Header: "Start year",
                accessor: "start_year",
              },
              {
                Header: "Added",
                accessor: "added",
              },
              {
                Header: "published",
                accessor: "published",
              },
              {
                Header: "Country",
                accessor: "country",
              },
              {
                Header: "Relevance",
                accessor: "relevance",
              },
              {
                Header: "Pestle",
                accessor: "pestle",
              },
              {
                Header: "Source",
                accessor: "source",
              },
              {
                Header: "title",
                accessor: "title",
              },
              {
                Header: "Likelihood",
                accessor: "likelihood",
              },
            ]}
            tableData={blogs?.length > 0 ? blogs : []}
          />
        </div>
      </div>
    </>
  );
}

export default App;

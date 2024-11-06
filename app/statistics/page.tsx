"use client";

import BarChart from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChart";
import CounterCard from "../components/CounterCard";
import LineChartComponent from "../components/LineChart";

const StatisticsPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-rows-1 gap-6">
      <CounterCard />
      <PieChartComponent />
      <BarChart />
      <LineChartComponent />
    </div>
  );
};

export default StatisticsPage;

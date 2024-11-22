"use client";

import BarChart from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChart";
import CounterCard from "../components/CounterCard";
import LineChartComponent from "../components/LineChart";

const StatisticsPage = () => {
  return (
    <div className="p-6 gap-4 flex flex-col items-center justify-center my-10">
      <div className="flex w-full flex-col gap-5 md:flex-row items-center justify-center">
        <CounterCard />
        <PieChartComponent />
      </div>
      <div className="flex w-full flex-col gap-5 md:flex-row items-center justify-center">
        <BarChart />
        <LineChartComponent />
      </div>
    </div>
  );
};

export default StatisticsPage;

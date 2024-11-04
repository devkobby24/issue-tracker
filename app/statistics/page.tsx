'use client';
import BarChart from './../components/BarChart';
import PieChart from '../components/PieChart';
import CounterCard from '../components/CounterCard';

const StatisticsPage = () => {
  return (
    <div className="space-y-8 flex flex-col lg:flex-row lg:space-x-8 justify-center items-center w-full min-h-[100vh]">
      <CounterCard />
      <BarChart />
      <PieChart />
      {/* <IssuesTable issues={issues} /> */}
    </div>
  );
};

export default StatisticsPage;

'use client';
import BarChart from './../components/BarChart';
import PieChart from '../components/PieChart';
import CounterCard from '../components/CounterCard';

const StatisticsPage = () => {
  return (
    <div className="space-y-8 flex flex-col items-center w-full min-h-[100vh]">
      <CounterCard />
      <BarChart />
      <PieChart />
      {/* <IssuesTable issues={issues} /> */}
    </div>
  );
};

export default StatisticsPage;

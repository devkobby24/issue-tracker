'use client';
import BarChart from './../components/BarChart';
import PieChart from '../components/PieChart';

const StatisticsPage = () => {
  return (
    <div className="space-y-8 flex flex-col items-center w-full min-h-[100vh]">
      <BarChart />
      <PieChart />
      {/* <IssuesTable issues={issues} /> */}
    </div>
  );
};

export default StatisticsPage;

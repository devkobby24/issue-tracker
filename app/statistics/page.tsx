'use client';
import BarChart from './../components/BarChart';
import PieChart from '../components/PieChart';
import IssuesTable from '../components/IssuesTable';
import { dummyData, statusStatistics } from '../constants/options';

const StatisticsPage = () => {
  return (
    <div className="space-y-8 flex flex-col items-center w-full">
      <BarChart dailyStatistics={dummyData} />
      <PieChart statusStatistics={statusStatistics}  />
      {/* <IssuesTable issues={issues} /> */}
    </div>
  );
};

export default StatisticsPage;

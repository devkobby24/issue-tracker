'use client';
import BarChart from './../components/BarChart';
import PieChart from '../components/PieChart';
import IssuesTable from '../components/IssuesTable';

// Dummy Data: Array mimicking the structure of dailyStatistics
const dummyData = [
  {
    createdAt: '2024-10-01T00:00:00.000Z',
    _count: { id: 5 }, // 5 issues created on Oct 1, 2024
  },
  {
    createdAt: '2024-10-02T00:00:00.000Z',
    _count: { id: 8 }, // 8 issues created on Oct 2, 2024
  },
  {
    createdAt: '2024-10-03T00:00:00.000Z',
    _count: { id: 3 }, // 3 issues created on Oct 3, 2024
  },
  {
    createdAt: '2024-10-04T00:00:00.000Z',
    _count: { id: 10 }, // 10 issues created on Oct 4, 2024
  },
  {
    createdAt: '2024-10-05T00:00:00.000Z',
    _count: { id: 6 }, // 6 issues created on Oct 5, 2024
  },
];

const statusStatistics = [
    { status: 'Open', count: 8 },
    { status: 'In Progress', count: 5 },
    { status: 'Closed', count: 7 },
];

// Sample data for the issues table
const issues = [
    { id: 1, title: 'Fix login bug', description: 'Users are unable to login with Google OAuth.', status: 'Open' },
    { id: 2, title: 'Update dashboard UI', description: 'Redesign the dashboard with the new layout.', status: 'In Progress' },
    { id: 3, title: 'Implement notifications', description: 'Add email notifications for new issues.', status: 'Closed' },
    { id: 4, title: 'Improve performance', description: 'Optimize database queries for faster response times.', status: 'Open' },
    { id: 5, title: 'Add dark mode', description: 'Allow users to toggle between light and dark themes.', status: 'In Progress' },
];

// Component that uses the dummy data
const StatisticsPage = () => {
  return (
    <div className="space-y-5 flex flex-col items-center min-h-svh">
      <BarChart dailyStatistics={dummyData} />
      <PieChart statusStatistics={statusStatistics}  />
      {/* <IssuesTable issues={issues} /> */}
    </div>
  );
};

export default StatisticsPage;

'use client';
import BarChart from './../components/BarChart';

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

// Component that uses the dummy data
const StatisticsPage = () => {
  return (
    <div className="min-h-screen">
      <BarChart dailyStatistics={dummyData} />
    </div>
  );
};

export default StatisticsPage;

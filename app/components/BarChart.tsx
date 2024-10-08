import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DailyStatistics {
    createdAt: string;
    _count: {
        id: number;
    };
}

interface BarChartProps {
    dailyStatistics: DailyStatistics[];
}

const BarChart: React.FC<BarChartProps> = ({ dailyStatistics }) => {
    const labels = dailyStatistics.map((stat) =>
        format(new Date(stat.createdAt), 'yyyy-MM-dd')
    );
    const dataCounts = dailyStatistics.map((stat) => stat._count.id);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Number of Issues',
                data: dataCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='min-h-screen flex flex-col items-center p-4'>
            <h2 className="text-xl font-bold mb-4">Daily Issue Statistics</h2>
            <div className="w-full max-w-xl">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default BarChart;

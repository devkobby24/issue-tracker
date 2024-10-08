import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface StatusStatistics {
    status: string;
    count: number;
}

interface PieChartProps {
    statusStatistics: StatusStatistics[];
}

const PieChart: React.FC<PieChartProps> = ({ statusStatistics }) => {
    const labels = statusStatistics.map(stat => stat.status);
    const dataCounts = statusStatistics.map(stat => stat.count);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Issues by Status',
                data: dataCounts,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='flex flex-col items-center p-4'>
            <h2 className="text-xl font-bold mb-4">Issue Status Distribution</h2>
            <div className="max-w-xl w-full">
                <Pie data={data} />
            </div>
        </div>
    );
};

export default PieChart;

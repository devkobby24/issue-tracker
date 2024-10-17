import React, { useEffect, useState } from 'react';
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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/FireBaseConfig';
import { getAuth } from 'firebase/auth';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DailyStatistics {
    createdAt: string;
    _count: {
        id: number;
    };
}

interface BarChartProps {
    // Remove the dailyStatistics prop since we'll fetch data internally
}

const BarChart: React.FC<BarChartProps> = () => {
    const [dailyStatistics, setDailyStatistics] = useState<DailyStatistics[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchUserIssues = async () => {
            setLoading(true); // Set loading state to true
            try {
                const auth = getAuth();
                const user = auth.currentUser; // Get the current authenticated user

                if (!user) {
                    console.error('No user is currently logged in.');
                    return; // Exit if no user is logged in
                }

                const userEmail = user.email; // Get user's email
                const issuesQuery = query(collection(db, 'issues'), where("userEmail", "==", userEmail)); // Query to fetch user's issues

                const querySnapshot = await getDocs(issuesQuery);
                const fetchedStatistics: DailyStatistics[] = [];

                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    // Here, you might need to transform your data to match the DailyStatistics structure
                    const createdAtDate = data.createdAt; // Make sure you have a createdAt field in your data
                    if (createdAtDate) {
                        const existingStat = fetchedStatistics.find(stat => format(new Date(stat.createdAt), 'yyyy-MM-dd') === format(new Date(createdAtDate), 'yyyy-MM-dd'));
                        if (existingStat) {
                            existingStat._count.id += 1; // Increment the count for the existing date
                        } else {
                            fetchedStatistics.push({
                                createdAt: createdAtDate,
                                _count: { id: 1 },
                            });
                        }
                    }
                });

                setDailyStatistics(fetchedStatistics);
            } catch (error) {
                console.error('Error fetching user issues:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchUserIssues();
    }, []);

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
        <div className='p-4'>
            <h2 className="text-4xl font-bold mb-4">Daily Issue Statistics</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
                </div>
            ) : (
                <div className="items-center">
                    <Bar data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default BarChart;

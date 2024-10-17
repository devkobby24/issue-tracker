import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/FireBaseConfig';

// Register the necessary chart.js components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface StatusStatistics {
    status: string;
    count: number;
}

const PieChart: React.FC = () => {
    const [statusStatistics, setStatusStatistics] = useState<StatusStatistics[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchUserIssues = async () => {
            setLoading(true); // Set loading state to true
            try {
                // Fetch user from localStorage
                const userData = localStorage.getItem("user");
                const user = userData ? JSON.parse(userData) : null;

                if (!user || !user.email) {
                    console.error('No user found in localStorage.');
                    return; // Exit if no user found
                }

                const userEmail = user.email; // Get user's email from localStorage
                const issuesQuery = query(collection(db, 'issues'), where("userEmail", "==", userEmail)); // Query to fetch user's issues

                const querySnapshot = await getDocs(issuesQuery);
                const statusCount: Record<string, number> = {};

                // Aggregate counts by status
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const status = data.status; // Ensure you have a status field
                    if (status) {
                        statusCount[status] = (statusCount[status] || 0) + 1; // Increment count for each status
                    }
                });

                // Convert the status count object to an array of StatusStatistics
                const statisticsArray: StatusStatistics[] = Object.entries(statusCount).map(([status, count]) => ({
                    status,
                    count,
                }));

                setStatusStatistics(statisticsArray);
            } catch (error) {
                console.error('Error fetching user issues:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchUserIssues();
    }, []);

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
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='flex flex-col p-4'>
            <h2 className="text-4xl font-bold mb-4">Issue Status Distribution</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
                </div>
            ) : (
                <div className="w-full items-center">
                    <Pie data={data} />
                </div>
            )}
        </div>
    );
};

export default PieChart;

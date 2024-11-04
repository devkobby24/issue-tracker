import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/FireBaseConfig';

interface StatusStatistics {
    status: string;
    count: number;
}

const CounterCard: React.FC = () => {
    const [statusStatistics, setStatusStatistics] = useState<StatusStatistics[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [totalIssues, setTotalIssues] = useState<number>(0); // Total issues

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
                let total = 0;

                // Aggregate counts by status and calculate total issues
                querySnapshot.forEach(doc => {
                    total++;
                    const data = doc.data();
                    const status = data.status; // Ensure you have a status field
                    if (status) {
                        statusCount[status] = (statusCount[status] || 0) + 1; // Increment count for each status
                    }
                });

                // Set total issues
                setTotalIssues(total);

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

    return (
        <div className="flex flex-col p-4">
            <h2 className="text-2xl md:text-4xl text-center font-bold mb-4">Issue Statistics By Count</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card for total issues */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-all">
                        <h3 className="text-xl font-semibold text-center">Total Issues</h3>
                        <p className="text-7xl font-sans font-bold text-center text-purple-600">{totalIssues}</p>
                    </div>

                    {/* Card for issues by status */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-all">
                        <h3 className="text-xl font-semibold pb-4">Issues by Status</h3>
                        <ul className="text-center">
                            {statusStatistics.map(stat => (
                                <li key={stat.status} className="text-lg">
                                    <span className="font-semibold font-sans list-item ">{stat.status}:</span> {stat.count}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CounterCard;

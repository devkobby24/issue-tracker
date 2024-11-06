"use client";

import React, { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip, Cell } from "recharts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/FireBaseConfig"; // Update with your Firebase config path

import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

interface IssueData {
  status: string;
  count: number;
  fill: string;
}

// You can customize the colors as per your requirement
const colors = ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#9C27B0"];

const PieChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<IssueData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        if (!user) {
          console.log("No user or email found in Clerk. PieChartComponent");
          return; // Exit if no user found
        }

        const userEmail = user.primaryEmailAddress?.emailAddress;
        const issuesQuery = query(
          collection(db, "issues"),
          where("userEmail", "==", userEmail) // Filter by user email
        );

        const querySnapshot = await getDocs(issuesQuery);
        const issueCountMap: Record<string, number> = {};

        // Process the issues data
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const status = data.status || "Unknown"; // Adjust field name if needed

          // Count issues per status
          if (status in issueCountMap) {
            issueCountMap[status]++;
          } else {
            issueCountMap[status] = 1;
          }
        });

        // Convert the issue count map to chart data
        const fetchedData: IssueData[] = Object.keys(issueCountMap).map(
          (status, index) => ({
            status,
            count: issueCountMap[status],
            fill: colors[index % colors.length], // Assuming colors is an array of color values
          })
        );

        setChartData(fetchedData);
      } catch (error) {
        console.error("Error fetching issue data:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData();
  }, [user]); // Only trigger on initial mount

  return (
    <div className="items-center justify-center sm:w-auto md:max-w-[400px]">
      <Card className="flex flex-col items-center w-full h-[390px]">
        <CardHeader className="items-center pb-0">
          <CardTitle>Issue Status</CardTitle>
          <CardDescription>Distribution of Issues by Status</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
            </div>
          ) : (
            <PieChart width={270} height={270}>
              <Tooltip />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                label
                outerRadius={100}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing issue status distribution
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PieChartComponent;

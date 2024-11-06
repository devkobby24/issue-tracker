"use client";

import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/FireBaseConfig";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

interface MonthlyStatistics {
  month: string;
  count: number;
}

const BarChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<MonthlyStatistics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser(); // Fetching the user object from Clerk
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user) {
          console.log(
            "No user found in localStorage. Barchart will not render."
          );
          return;
        }

        const userEmail = user.primaryEmailAddress?.emailAddress; // Use primaryEmailAddress
        const issuesQuery = query(
          collection(db, "issues"),
          where("userEmail", "==", userEmail) // Fetch based on primary email address
        );

        const querySnapshot = await getDocs(issuesQuery);
        const monthlyStatistics: { [month: string]: number } = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const createdAtDate = data.createdAt;

          if (createdAtDate) {
            const month = format(new Date(createdAtDate), "MMMM");
            monthlyStatistics[month] = (monthlyStatistics[month] || 0) + 1;
          }
        });

        const formattedData = Object.entries(monthlyStatistics).map(
          ([month, count]) => ({
            month,
            count,
          })
        );

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex-col items-center justify-center sm:w-auto md:max-w-[400px]">
      <Card className="text-center h-[400px] max-w-[400px]">
        <CardHeader>
          <CardTitle>Issue Statistics</CardTitle>
          <CardDescription>Monthly Issue Counts</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {" "}
          {/* Remove padding */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} barSize={50} margin={{ right: 30 }}>
                <CartesianGrid />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                <YAxis width={30} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#000234" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
        <CardFooter className="flex-col items-center text-sm">
          <div className="leading-none text-muted-foreground">
            Displaying monthly issue creation trends.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BarChartComponent;

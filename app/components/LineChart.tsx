"use client"

import React, { useEffect, useState } from "react"
import { GitCommitVertical, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../service/FireBaseConfig"
import { useUser } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart displaying issue counts by priority"

const chartConfig = {
  high: {
    label: "High Priority",
    color: "hsl(var(--chart-1))",
  },
  medium: {
    label: "Medium Priority",
    color: "hsl(var(--chart-2))",
  },
  low: {
    label: "Low Priority",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const LineChartComponent = () => {
  const [chartData, setChartData] = useState<any[]>([]) // Chart data
  const [loading, setLoading] = useState<boolean>(false) // Loading state
  const {user} =useUser(); // Fetch the user object from Clerk

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try { 
        if (!user || !user.primaryEmailAddress) {
          console.log("No user or email found in Clerk. LineChartComponent");
          return; // Exit if no user found
        }
  
        const userEmail = user.primaryEmailAddress.emailAddress;
        const issuesQuery = query(
          collection(db, "issues"),
          where("userEmail", "==", userEmail) // Query based on user email
        );
  
        const querySnapshot = await getDocs(issuesQuery);
        const priorityCount: Record<string, number> = { high: 0, medium: 0, low: 0 };
  
        // Process the issues data
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const status = data.priority; // Assuming priority is a field in Firestore
  
          // Count issues based on priority
          if (status === "HIGH") {
            priorityCount.high++;
          } else if (status === "MEDIUM") {
            priorityCount.medium++;
          } else if (status === "LOW") {
            priorityCount.low++;
          }
        });
  
        // Set the chart data with the counts for each priority
        setChartData([
          { priority: "High", count: priorityCount.high },
          { priority: "Medium", count: priorityCount.medium },
          { priority: "Low", count: priorityCount.low },
        ]);
      } catch (error) {
        console.error("Error fetching issue data:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="flex items-center justify-center sm:w-auto md:max-w-[400px]">
    <Card className="flex-1 max-w-[400px] md:h-[400px]">
      <CardHeader className="text-center mb-3 bg-transparent">
        <CardTitle>Issue Count by Priority</CardTitle>
        <CardDescription>Count of issues by priority level</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="items-start justify-start h-auto mt-3">
            <LineChart
                width={400}
                height={200}
              accessibilityLayer
              data={chartData}
              margin={{
                right: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="priority"
                tickLine={false}
                axisLine={true}
                tickMargin={8}
              />
              <YAxis width={25} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="count"
                type="monotone"
                stroke="var(--color-high)"
                strokeWidth={2}
                dot={({ cx, cy, payload }) => {
                  const r = 24
                  return (
                    <GitCommitVertical
                      key={payload.priority}
                      x={cx - r / 2}
                      y={cy - r / 2}
                      width={r}
                      height={r}
                      fill="hsl(var(--background))"
                      stroke="var(--color-high)"
                    />
                  )
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="items-center justify-center text-sm">
        <p className="leading-none text-muted-foreground">
          Showing the distribution of issue priorities
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}

export default LineChartComponent

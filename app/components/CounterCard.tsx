import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/FireBaseConfig";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useUser } from "@clerk/nextjs";
import { ArrowDownToDot } from "lucide-react";

interface StatusStatistics {
  status: string;
  count: number;
}

const CounterCard: React.FC = () => {
  const [statusStatistics, setStatusStatistics] = useState<StatusStatistics[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [totalIssues, setTotalIssues] = useState<number>(0); // Total issues
  const { user } = useUser(); // Fetching the user object from Clerk

  useEffect(() => {
    const fetchUserIssues = async () => {
      setLoading(true); // Set loading state to true
      try {
        if (!user) {
          console.log(
            "No user found in localStorage. CounterCard will not render."
          );
          return; // Exit if no user found
        }

        const userEmail = user.primaryEmailAddress?.emailAddress; // Get user's email from localStorage
        const issuesQuery = query(
          collection(db, "issues"),
          where("userEmail", "==", userEmail)
        ); // Query to fetch user's issues

        const querySnapshot = await getDocs(issuesQuery);
        const statusCount: Record<string, number> = {};
        let total = 0;

        // Aggregate counts by status and calculate total issues
        querySnapshot.forEach((doc) => {
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
        const statisticsArray: StatusStatistics[] = Object.entries(
          statusCount
        ).map(([status, count]) => ({
          status,
          count,
        }));

        setStatusStatistics(statisticsArray);
      } catch (error) {
        console.error("Error fetching user issues:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchUserIssues();
  }, [user]);

  // Chart data for total issues
  const chartData = [
    {
      category: "Issues Created",
      total: totalIssues,
      fill: "var(--color-issues)",
    },
  ];

  const chartConfig = {
    total: {
      label: "Total Issues Created",
    },
    issuesCreated: {
      label: "Issues Created",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex items-center justify-center md:max-w-[400px] ">
      <Card className="flex-col w-[300px] md:w-[400px] p-0 min-h-[390px]">
        <CardHeader className="items-center pb-0">
          <CardTitle>Total Issues Created</CardTitle>
          <CardDescription>Issues by count</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-2 ">
          {loading ? (
            <div className="flex flex-col justify-center items-center gap-4 my-10 ">
              <ArrowDownToDot className="animate-bounce" />
              <p className="text-sm">Fetching Stats...</p>
            </div>
          ) : (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={250}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="total" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {chartData[0].total.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Issues Created
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total issues created
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CounterCard;

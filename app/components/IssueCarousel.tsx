"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  // CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee: string;
  priority: string;
  tags: string[];
  createdDate: string;
}

const IssuesCarousel: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="bg-white rounded-sm px-6 w-full overflow-hidden flex flex-col items-center justify-center">
      <h2 className=" text-2xl md:text-4xl font-bold mb-6 text-gray-600 text-center">
        Recent Issues By Users
      </h2>

      <Carousel
        plugins={[autoplayPlugin.current]}
        className=" md:w-[350px] mx-5 w-[270px] h-[350px]"
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent>
          {issues.map((issue) => (
            <CarouselItem key={issue.id}>
              <Card className="h-[350px] w-full flex flex-col items-center justify-center border-2">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-center">
                    {issue.title.toUpperCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="space-y-2">
                    <p className="md:text-md text-sm ">
                      <strong>🔠 Description:</strong> {issue.description}
                    </p>
                    <p className="md:text-md text-sm ">
                      <strong>✅ Status:</strong> {issue.status}
                    </p>
                    <p className="md:text-md text-sm ">
                      <strong>👨🏾‍💻 Assignee:</strong> {issue.assignee}
                    </p>
                    <p className="md:text-md text-sm ">
                      <strong>🔼 Priority:</strong> {issue.priority}
                    </p>
                    <p className="md:text-md text-sm ">
                      <strong>🏷️ Tags:</strong>{" "}
                      {issue.tags.map((tag) => `#${tag}`).join(", ")}
                    </p>
                    <p className="md:text-md text-sm ">
                      <strong>📅 Date Created:</strong> {issue.createdDate}
                    </p>
                  </span>
                </CardContent>
                <CardFooter>
                  <span className="leading-none text-muted-foreground">
                    Issue Details
                  </span>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default IssuesCarousel;

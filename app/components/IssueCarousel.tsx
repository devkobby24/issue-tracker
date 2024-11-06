"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  const autoplayPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="bg-white rounded-sm p-6 w-full overflow-hidden items-center justify-center">
      <h2 className="font-sans text-2xl md:text-4xl font-bold mb-6 text-gray-600 text-center">
        Recent Issues By Users
      </h2>
      
      <Carousel
        plugins={[autoplayPlugin.current]}
        className="items-center justify-center max-w-xs mx-auto"
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent className="items-center jus`">
          {issues.map((issue) => (
            <CarouselItem key={issue.id} className="p-2 items-center justify-center">
              <Card className="h-full p-2 w-full items-center justify-center">
                <CardHeader>
                  <CardTitle className="text-lg font-sans font-bold text-center">
                    {issue.title.toUpperCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent className=" items-center justify-center p-6">
                  <span className="space-y-2">
                  <p className="md:text-lg text-sm font-sans">
                    <strong>🔠 Description:</strong> {issue.description}
                  </p>
                  <p className="md:text-lg text-sm font-sans">
                    <strong>✅ Status:</strong> {issue.status}
                  </p>
                  <p className="md:text-lg text-sm font-sans">
                    <strong>👨🏾‍💻 Assignee:</strong> {issue.assignee}
                  </p>
                  <p className="md:text-lg text-sm font-sans">
                    <strong>🔼 Priority:</strong> {issue.priority}
                  </p>
                  <p className="md:text-lg text-sm font-sans">
                    <strong>🏷️ Tags:</strong> {issue.tags.map((tag) => `#${tag}`).join(", ")}
                  </p>
                  <p className="md:text-lg text-sm font-sans">
                    <strong>📅 Date Created:</strong> {issue.createdDate}
                  </p>
                  </span>
                </CardContent>
                <CardFooter className="flex justify-center text-sm">
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

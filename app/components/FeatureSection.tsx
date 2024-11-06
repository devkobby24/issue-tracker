"use client";

import {
  PlusCircle,
  Edit,
  Trash2,
  RefreshCw,
  BarChart2,
  CheckCircle,
} from "lucide-react"; // Import necessary icons
import React from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeaturesSection = () => {
  const features = [
    {
      icon: <PlusCircle className="h-10 w-10 mb-2" />,
      title: "Create Issues",
      description:
        "Easily create new issues with details like title, description, and priority.",
    },
    {
      icon: <Edit className="h-10 w-10 mb-2" />,
      title: "Edit Issues",
      description:
        "Update issue details anytime with our intuitive editing feature.",
    },
    {
      icon: <Trash2 className="h-10 w-10 mb-2" />,
      title: "Delete Issues",
      description:
        "Remove issues from the tracker when they're resolved or no longer needed.",
    },
    {
      icon: <RefreshCw className="h-10 w-10 mb-2" />,
      title: "Status Update",
      description:
        "Keep track of issue status with real-time updates for your team.",
    },
    {
      icon: <BarChart2 className="h-10 w-10 mb-2" />,
      title: "Analytics",
      description:
        "Gain insights on issue trends and team performance with analytics.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 mb-2" />,
      title: "Track Progress",
      description: "Monitor issue status and track progress until completion.",
    },
  ];

  const FeatureCard = ({ icon, title, description }: Feature) => {
    return (
      <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-500 text-center">{description}</p>
      </div>
    );
  };

  return (
    <section className="w-full py-6 md:py-12 flex items-center justify-center">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-5xl text-center mb-8">
          Key Features
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

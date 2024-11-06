"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import IssuesCarousel from "./components/IssueCarousel";
import FeaturesSection from "./components/FeatureSection";
import { issues } from "./Data";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  // useEffect(() => {
  //   console.log(user);
  // }, []);
  const handleClick = () => {
    user ? router.push("/issues") : router.push("/sign-in");
  };

  return (
    <div className="p-4 space-y-6 flex flex-col items-center w-full">
      <HeaderSection />
      <Button size="lg" onClick={handleClick}>
        Get Started!
      </Button>
      <IssuesCarousel issues={issues} />
      <FeaturesSection />
    </div>
  );
}

function HeaderSection() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-black text-center">
        Issue Tracker
      </h1>
      <p className="text-lg text-gray-500 mb-4 text-center sm:text-md">
        Track and manage issues easily with our intuitive interface. Assign
        tasks, monitor progress, and streamline your workflow!
      </p>
    </>
  );
}

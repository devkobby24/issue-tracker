"use client";
import { Button } from "@/components/ui/button";
import { TokenResponse } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IssuesCarousel from "./components/IssueCarousel";
import ImageComponent from "./components/ImageComponent";

export default function Home() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const issues = [
    {
      id: 1,
      title: "Fix login bug",
      description: "Users are unable to login with Google OAuth.",
      status: "Open",
      assignee: "John Doe",
      priority: "High",
      createdDate: "2024-10-15",
      dueDate: "2024-10-30",
      tags: ["bug", "authentication"],
    },
    {
      id: 2,
      title: "Update dashboard UI",
      description: "Redesign the dashboard with the new layout.",
      status: "In Progress",
      assignee: "Jane Smith",
      priority: "Medium",
      createdDate: "2024-10-10",
      dueDate: "2024-11-05",
      tags: ["UI", "design"],
    },
    {
      id: 3,
      title: "Implement notifications",
      description: "Add email notifications for new issues.",
      status: "Closed",
      assignee: "Alice Johnson",
      priority: "Low",
      createdDate: "2024-09-25",
      dueDate: "2024-10-20",
      tags: ["feature", "notifications"],
    },
    {
      id: 4,
      title: "Optimize database queries",
      description: "Improve the performance of slow SQL queries.",
      status: "Open",
      assignee: "Bob Williams",
      priority: "High",
      createdDate: "2024-10-12",
      dueDate: "2024-11-01",
      tags: ["performance", "database"],
    },
    {
      id: 5,
      title: "Fix broken links",
      description: "Update all broken links across the website.",
      status: "In Progress",
      assignee: "Eva Brown",
      priority: "Medium",
      createdDate: "2024-10-14",
      dueDate: "2024-11-10",
      tags: ["bug", "maintenance"],
    },
    {
      id: 6,
      title: "Add dark mode",
      description: "Implement dark mode theme across the application.",
      status: "Open",
      assignee: "Charlie Green",
      priority: "Low",
      createdDate: "2024-10-05",
      dueDate: "2024-11-15",
      tags: ["feature", "UI"],
    },
    {
      id: 7,
      title: "Create user documentation",
      description: "Develop comprehensive documentation for end users.",
      status: "Open",
      assignee: "David Black",
      priority: "Medium",
      createdDate: "2024-10-20",
      dueDate: "2024-11-25",
      tags: ["documentation", "user"],
    },
    {
      id: 8,
      title: "Set up CI/CD pipeline",
      description: "Automate deployment process using CI/CD.",
      status: "In Progress",
      assignee: "Eve White",
      priority: "High",
      createdDate: "2024-10-18",
      dueDate: "2024-11-05",
      tags: ["devops", "automation"],
    },
    {
      id: 9,
      title: "Conduct user testing",
      description:
        "Gather feedback from users after implementing new features.",
      status: "Open",
      assignee: "Frank Gray",
      priority: "Low",
      createdDate: "2024-10-22",
      dueDate: "2024-11-30",
      tags: ["testing", "feedback"],
    },
    {
      id: 10,
      title: "Review security protocols",
      description: "Assess and update security measures in the application.",
      status: "Open",
      assignee: "Grace Silver",
      priority: "High",
      createdDate: "2024-10-25",
      dueDate: "2024-11-15",
      tags: ["security", "review"],
    },
  ];

  const GetUserProfile = (
    tokenInfo: Omit<TokenResponse, "error" | "error_description" | "error_uri">
  ) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false); // Close dialog on success
        router.push("/issues/new");
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleGetStartedClick = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true); // Show login dialog if user is not logged in
    } else {
      router.push("/issues/new"); // Navigate to issues page if logged in
    }
  };

  return (
    <div className="p-4 space-y-6 flex flex-col items-center min-h-[90vh] w-full">
      <h1 className="text-4xl font-bold mb-6 text-gray-600 text-center">
        Issue Tracker
      </h1>
      <p className="text-lg text-gray-500 mb-4 text-center">
        Track and manage issues easily with our intuitive interface. Assign
        tasks, monitor progress, and streamline your workflow!
      </p>
      <Button size="lg" onClick={handleGetStartedClick}>
        Get Started!
      </Button>

      {/* Issues Carousel */}
      <IssuesCarousel issues={issues} />

      {/* Image Component */}
      <ImageComponent />

      {/* Google login dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <Image
              src="/bug-logo.png"
              alt="logo"
              className="rounded-full w-12 h-12"
              width={48}
              height={48}
            />
            <h2 className="font-bold text-lg mt-5">Sign In to Continue</h2>
          </DialogHeader>
          <DialogDescription className="text-center">
            <p className="mb-4">
              Use your Google account to sign in and start managing issues!
            </p>
            <Button
              onClick={() => login()}
              className="w-full flex items-center justify-center gap-3"
            >
              <FcGoogle className="h-6 w-6" /> Continue with Google
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

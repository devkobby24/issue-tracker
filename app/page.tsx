"use client";
import { Button } from "@/components/ui/button";
import { TokenResponse } from '@react-oauth/google';
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
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Home() {
  const router = useRouter(); // Initialize the router at the top of your component

  // Demo issues data
  const issues = [
    {
      id: 1,
      title: 'Fix login bug',
      description: 'Users are unable to login with Google OAuth.',
      status: 'Open',
      assignee: 'John Doe',
    },
    {
      id: 2,
      title: 'Update dashboard UI',
      description: 'Redesign the dashboard with the new layout.',
      status: 'In Progress',
      assignee: 'Jane Smith',
    },
    {
      id: 3,
      title: 'Implement notifications',
      description: 'Add email notifications for new issues.',
      status: 'Closed',
      assignee: 'Alice Johnson',
    },
    {
      id: 4,
      title: 'Optimize database queries',
      description: 'Improve the performance of slow SQL queries.',
      status: 'Open',
      assignee: 'Bob Williams',
    },
    {
      id: 5,
      title: 'Fix broken links',
      description: 'Update all broken links across the website.',
      status: 'In Progress',
      assignee: 'Eva Brown',
    },
    {
      id: 6,
      title: 'Add dark mode',
      description: 'Implement dark mode theme across the application.',
      status: 'Open',
      assignee: 'Charlie Green',
    }
  ];

  const [openDialog, setOpenDialog] = useState(false);

  // Function to fetch user profile after login
  const GetUserProfile = (tokenInfo: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
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
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data)); // Store user data in localStorage
        setOpenDialog(false); 
        router.push('/issues/new'); // Navigate to create issue page
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
      });
  };

  // Function to handle Google login success or failure
  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log("Login Failed:", error),
  });

  // Function to handle Get Started button click
  const handleGetStartedClick = () => {
    const user = localStorage.getItem("user");
  
    if (!user) {
      setOpenDialog(true); // Show dialog if the user is not logged in
    } else {
      // Navigate to the /issues/new page if the user is logged in
      router.push('/issues/new');
    }
  };

  return (
    <div className="p-2 space-y-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-600 text-center">Issue Tracker <span className="block">Dashboard</span></h1>
      <p className="text-sm md:text-lg text-gray-500 mb-4 text-center">
        Struggling to track issues in your project?🤷🏿 Our issue tracker makes it easy! Log, assign, and prioritize tasks with a user-friendly interface, real-time updates, and seamless collaboration👌🏾. Whether you're a small team or managing a big project👨🏾‍💻, stay organized, save time⌚, and boost productivity📈. Get started today and streamline your workflow!🚀 
      </p>
      <div className="space-x-2 space-y-2">
        <Button size="lg" onClick={handleGetStartedClick}>
          Get Started!
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Some Issues Created by Our Clients</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold font-sans mb-2">{issue.title.toUpperCase()}</h3>
              <p><span className="font-semibold">Description:</span> {issue.description}</p>
              <p><span className="font-semibold">Status:</span> {issue.status}</p>
              <p><span className="font-semibold">Assignee:</span> {issue.assignee}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Google login dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <Image src="/bug-logo.png" alt="logo" className="rounded-full w-10 h-10"/>
              <h2 className="font-bold text-lg mt-7">Sign In To Continue</h2>
              <p>Sign in to the app with Google authentication</p>
              <Button
                onClick={() => login()}
                className="mt-5 w-full flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Continue With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

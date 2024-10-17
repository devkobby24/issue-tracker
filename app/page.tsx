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

export default function Home() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const issues = [
    { id: 1, title: "Fix login bug", description: "Users are unable to login with Google OAuth.", status: "Open", assignee: "John Doe" },
    { id: 2, title: "Update dashboard UI", description: "Redesign the dashboard with the new layout.", status: "In Progress", assignee: "Jane Smith" },
    { id: 3, title: "Implement notifications", description: "Add email notifications for new issues.", status: "Closed", assignee: "Alice Johnson" },
    { id: 4, title: "Optimize database queries", description: "Improve the performance of slow SQL queries.", status: "Open", assignee: "Bob Williams" },
    { id: 5, title: "Fix broken links", description: "Update all broken links across the website.", status: "In Progress", assignee: "Eva Brown" },
    { id: 6, title: "Add dark mode", description: "Implement dark mode theme across the application.", status: "Open", assignee: "Charlie Green" },
  ];

  const GetUserProfile = (tokenInfo: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      })
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
    <div className="p-4 space-y-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-600 text-center">Issue Tracker</h1>
      <p className="text-lg text-gray-500 mb-4 text-center">
        Track and manage issues easily with our intuitive interface. Assign tasks, monitor progress, and streamline your workflow!
      </p>
      <Button size="lg" onClick={handleGetStartedClick}>
        Get Started!
      </Button>

      {/* Issues List */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Recent Issues</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
              <p><strong>Description:</strong> {issue.description}</p>
              <p><strong>Status:</strong> {issue.status}</p>
              <p><strong>Assignee:</strong> {issue.assignee}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Google login dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <Image src="/bug-logo.png" alt="logo" className="rounded-full w-12 h-12" width={48} height={48} />
            <h2 className="font-bold text-lg mt-5">Sign In to Continue</h2>
          </DialogHeader>
          <DialogDescription className="text-center">
            <p className="mb-4">Use your Google account to sign in and start managing issues!</p>
            <Button onClick={() => login()} className="w-full flex items-center justify-center gap-3">
              <FcGoogle className="h-6 w-6" /> Continue with Google
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

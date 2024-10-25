"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { FaBugs } from "react-icons/fa6";
import IssueStatusButtons from "../status/IssueStatus";
import { useToast } from "@/hooks/use-toast";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../service/FireBaseConfig";

const IssuesPage = () => {
  interface Issue {
    id: string;
    title: string;
    description: string;
    status: string;
    userEmail: string;
  }

  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // Fetch user from localStorage
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;

        if (!user || !user.email) {
          console.log("No user found in localStorage.");
          setIssues([]); // No user, set issues to empty
          setLoading(false);
          return;
        }

        const userEmail = user.email; // Get the user's email from localStorage

        console.log("Fetching issues for user:", userEmail); // Log the email for debugging

        // Query Firestore to fetch issues for this user
        const issuesQuery = query(
          collection(db, "issues"),
          where("userEmail", "==", userEmail)
        );
        const querySnapshot = await getDocs(issuesQuery);

        const fetchedIssues: Issue[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Issue[];

        setIssues(fetchedIssues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const deleteIssue = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "issues", id));
      setIssues(issues.filter((issue) => issue.id !== id)); // Remove the issue from the state after deletion
      toast({ description: "Issue deleted successfully" });
    } catch (error) {
      console.error("Error deleting issue:", error);
      toast({ description: "Failed to delete the issue" });
    } finally {
      setLoading(false);
    }
  };

  const updateIssueStatus = async (
    id: string,
    status: "OPEN" | "IN_PROGRESS" | "CLOSED"
  ) => {
    try {
      const issueRef = doc(db, "issues", id);
      await updateDoc(issueRef, { status });

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === id ? { ...issue, status } : issue
        )
      );

      toast({ description: "Issue status updated" });
    } catch (error) {
      toast({ description: "Failed to update issue status" });
      console.error("Error updating issue status:", error);
    }
  };

  return (
    <div className="container space-y-5 font-sans min-h-[100vh] px-4 min-w-full">
      <h1 className="text-2xl md:text-4xl font-bold font-sans mb-4 items-center justify-center flex">
        My Issues <FaBugs />
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <div
                key={issue.id}
                className="border border-gray-300 rounded-lg p-4 shadow transition-all hover:scale-105 duration-200 space-y-2 bg-slate-100"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {issue.title.toUpperCase()}
                </h2>
                <p className="text-gray-500">{issue.description}</p>
                <p className="text-sm font-medium text-blue-600">
                  Status: {issue.status}
                </p>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => deleteIssue(issue.id)}
                    className="text-red-500"
                  >
                    <span className="block sm:hidden">
                      <MdDeleteSweep color="black" />
                    </span>
                    <span className="hidden sm:block">
                      {loading ? "Loading..." : "Delete"}
                    </span>
                  </Button>
                  <IssueStatusButtons
                    issue={issue}
                    updateIssueStatus={updateIssueStatus}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No issues found. Start by creating a new issue!
            </p>
          )}
        </div>
      )}

      <Button className="mt-4" size="3">
        <Link href={"/issues/new"}>Create An Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;

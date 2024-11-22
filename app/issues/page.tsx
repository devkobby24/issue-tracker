"use client";
import { Button } from "../../components/ui/button";
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
import { useUser } from "@clerk/nextjs";
import { Bug, RefreshCcw, Trash2 } from "lucide-react";

const IssuesPage = () => {
  interface Issue {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: "LOW" | "MEDIUM" | "HIGH"; // Adding priority to the Issue interface
    userEmail: string;
    createdAt: number; // Adding createdAt field
  }

  const { user } = useUser(); // Fetching the user object from Clerk
  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        if (!user || !user.primaryEmailAddress) {
          console.log("No user or email found in Clerk. IssuePage");
          setIssues([]);
          setLoading(false);
          return;
        }

        const userEmail = user.primaryEmailAddress.emailAddress; // Using the primaryEmailAddress from the user object
        console.log("Fetching issues for user:", userEmail);

        const issuesQuery = query(
          collection(db, "issues"),
          where("userEmail", "==", userEmail)
        );
        const querySnapshot = await getDocs(issuesQuery);

        const fetchedIssues: Issue[] = querySnapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Issue)
          )
          .sort((a, b) => b.createdAt - a.createdAt); // Sorting by createdAt in descending order

        setIssues(fetchedIssues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [user]); // Re-fetch when the user object changes

  const deleteIssue = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "issues", id));
      setIssues(issues.filter((issue) => issue.id !== id));
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

  const updateIssuePriority = async (
    id: string,
    priority: "LOW" | "MEDIUM" | "HIGH"
  ) => {
    try {
      const issueRef = doc(db, "issues", id);
      await updateDoc(issueRef, { priority });

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === id ? { ...issue, priority } : issue
        )
      );

      toast({ description: "Issue priority updated" });
    } catch (error) {
      toast({ description: "Failed to update issue priority" });
      console.error("Error updating issue priority:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[100vh] px-5 mt-5 w-full">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 items-center justify-center flex">
        My Issues <FaBugs />
      </h1>

      <Button className="my-10" size={"default"}>
        <Link href={"/issues/new"}>Create An Issue</Link>
      </Button>

      {loading ? (
        <div className="flex justify-center items-center gap-4">
          <RefreshCcw className="animate-spin" />
          <p className="text-sm">Fetching Issues...</p>
        </div>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-center justify-center">
          {issues?.length > 0 &&
            issues.map((issue) => (
              <div
                key={issue.id}
                className="border border-gray-300 rounded-lg p-4 shadow-md transition-all hover:shadow-stone-500 space-y-2 bg-slate-100 w-full max-w-[400px] md:min-h-[400px]"
              >
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-4">
                  <Bug />
                  {issue.title.toUpperCase()}
                </h2>
                <p className="text-gray-500">{issue.description}</p>
                <p className="text-sm font-medium text-blue-600">
                  Status: {issue.status}
                </p>
                <p className="text-sm font-medium text-yellow-600">
                  Priority: {issue.priority}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <IssueStatusButtons
                    issue={issue}
                    updateIssueStatus={updateIssueStatus}
                    updateIssuePriority={updateIssuePriority}
                  />
                  <Button
                    onClick={() => deleteIssue(issue.id)}
                    className="border-gray-400 border-2 rounded-xl text-lg"
                    variant={"destructive"}
                  >
                    <span className="block lg:hidden">
                      <Trash2 color="black" />
                    </span>
                    <span className="hidden lg:block">
                      {loading ? "Loading..." : "Delete"}
                    </span>
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}

      {!issues && (
        <p className="text-gray-500 mt-4 ">
          No issues found. Start by creating a new issue!
        </p>
      )}
    </div>
  );
};

export default IssuesPage;

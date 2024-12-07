import React from "react";
import { Button } from "../../components/ui/button";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

interface IssueStatusButtonsProps {
  issue: Issue;
  updateIssueStatus: (
    id: string,
    status: "OPEN" | "IN_PROGRESS" | "CLOSED"
  ) => void;
  updateIssuePriority: (
    id: string,
    priority: "LOW" | "MEDIUM" | "HIGH"
  ) => void;
}

const IssueStatusButtons: React.FC<IssueStatusButtonsProps> = ({
  issue,
  updateIssueStatus,
  updateIssuePriority,
}) => {
  return (
    <div className="space-y-4 p-4 border rounded-xl shadow-md bg-white">
      {/* Status Buttons */}
      <div className="space-y-2">
        <h3 className="font-semibold">Status</h3>
        <div className="flex space-x-2">
          <Button
            onClick={() => updateIssueStatus(issue.id, "OPEN")}
            className={`w-full p-2 rounded-full border-gray-400 border-2 ${
              issue.status === "OPEN" ? "bg-green-600" : "bg-gray-200"
            }`}
            disabled={issue.status === "OPEN"}
            variant="outline"
          >
            Open
          </Button>
          <Button
            onClick={() => updateIssueStatus(issue.id, "IN_PROGRESS")}
            className={`w-full p-2 rounded-full border-gray-400 border-2 ${
              issue.status === "IN_PROGRESS" ? "bg-yellow-600" : "bg-gray-200"
            }`}
            disabled={issue.status === "IN_PROGRESS"}
            variant="outline"
          >
            In Progress
          </Button>
          <Button
            onClick={() => updateIssueStatus(issue.id, "CLOSED")}
            className={`w-full p-2 rounded-full border-gray-400 border-2 ${
              issue.status === "CLOSED" ? "bg-red-600" : "bg-gray-200"
            }`}
            disabled={issue.status === "CLOSED"}
            variant="outline"
          >
            Closed
          </Button>
        </div>
      </div>

      {/* Priority Buttons */}
      <div className="space-y-2">
        <h3 className="font-semibold">Priority</h3>
        <div className="flex space-x-2">
          <Button
            onClick={() => updateIssuePriority(issue.id, "LOW")}
            className={`w-full p-2 rounded-full border-gray-400 border-2 ${
              issue.priority === "LOW" ? "bg-blue-600" : "bg-gray-200"
            }`}
            disabled={issue.priority === "LOW"}
            variant="outline"
          >
            Low
          </Button>
          <Button
            onClick={() => updateIssuePriority(issue.id, "MEDIUM")}
            className={`w-full p-2 rounded-full border-gray-400 border-2 ${
              issue.priority === "MEDIUM" ? "bg-yellow-600" : "bg-gray-200"
            }`}
            disabled={issue.priority === "MEDIUM"}
            variant="outline"
          >
            Medium
          </Button>
          <Button
            onClick={() => updateIssuePriority(issue.id, "HIGH")}
            className={`w-full p-2 rounded-full border-gray-400 border-2 ${
              issue.priority === "HIGH" ? "bg-red-600" : "bg-gray-200"
            }`}
            disabled={issue.priority === "HIGH"}
            variant="outline"
          >
            High
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueStatusButtons;

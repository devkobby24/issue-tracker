import React from 'react';
import { Button } from '@radix-ui/themes';

interface Issue {
  id: string; // Firestore IDs are strings
  title: string;
  description: string;
  status: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH'; // Adding priority
}

interface IssueStatusButtonsProps {
  issue: Issue;
  updateIssueStatus: (id: string, status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED') => void;
  updateIssuePriority: (id: string, priority: 'LOW' | 'MEDIUM' | 'HIGH') => void; // Function to update priority
}

const IssueStatusButtons: React.FC<IssueStatusButtonsProps> = ({
  issue,
  updateIssueStatus,
  updateIssuePriority,
}) => {
  return (
    <div className="space-y-2">
      {/* Status Buttons */}
      <div className="flex space-x-2 text-sm mb-4">
        {/* Button for Open */}
        <Button
          onClick={() => updateIssueStatus(issue.id, 'OPEN')}
          className={`p-2 rounded ${issue.status === 'OPEN' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          disabled={issue.status === 'OPEN'}
        >
          Open
        </Button>

        {/* Button for In Progress */}
        <Button
          onClick={() => updateIssueStatus(issue.id, 'IN_PROGRESS')}
          className={`p-2 rounded ${issue.status === 'IN_PROGRESS' ? 'bg-yellow-500 text-white' : 'bg-gray-300'}`}
          disabled={issue.status === 'IN_PROGRESS'}
        >
          In Progress
        </Button>

        {/* Button for Closed */}
        <Button
          onClick={() => updateIssueStatus(issue.id, 'CLOSED')}
          className={`p-2 rounded ${issue.status === 'CLOSED' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          disabled={issue.status === 'CLOSED'}
        >
          Closed
        </Button>
      </div>

      {/* Priority Buttons */}
      <div className="flex space-x-2 text-sm">
        {/* Button for Low Priority */}
        <Button
          onClick={() => updateIssuePriority(issue.id, 'LOW')}
          className={`p-2 rounded ${issue.priority === 'LOW' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          disabled={issue.priority === 'LOW'}
        >
          Low
        </Button>

        {/* Button for Medium Priority */}
        <Button
          onClick={() => updateIssuePriority(issue.id, 'MEDIUM')}
          className={`p-2 rounded ${issue.priority === 'MEDIUM' ? 'bg-orange-500 text-white' : 'bg-gray-300'}`}
          disabled={issue.priority === 'MEDIUM'}
        >
          Medium
        </Button>

        {/* Button for High Priority */}
        <Button
          onClick={() => updateIssuePriority(issue.id, 'HIGH')}
          className={`p-2 rounded ${issue.priority === 'HIGH' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          disabled={issue.priority === 'HIGH'}
        >
          High
        </Button>
      </div>
    </div>
  );
};

export default IssueStatusButtons;

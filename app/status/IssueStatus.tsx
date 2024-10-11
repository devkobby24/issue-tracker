import React from 'react';
import { Button } from '@radix-ui/themes';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface IssueStatusButtonsProps {
  issue: Issue;
  updateIssueStatus: (id: number, status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED') => void;
}

const IssueStatusButtons: React.FC<IssueStatusButtonsProps> = ({ issue, updateIssueStatus }) => {
  return (
    <div className="flex space-x-2 text-sm">
      {/* Button for Open */}
      <Button
        onClick={() => updateIssueStatus(issue.id, 'OPEN')}
        className={`p-2 rounded ${
          issue.status === 'OPEN' ? 'bg-green-500 text-white' : 'bg-gray-300'
        }`}
        disabled={issue.status === 'OPEN'}
      >
        Open
      </Button>

      {/* Button for In Progress */}
      <Button
        onClick={() => updateIssueStatus(issue.id, 'IN_PROGRESS')}
        className={`p-2 rounded ${
          issue.status === 'IN_PROGRESS' ? 'bg-yellow-500 text-white' : 'bg-gray-300'
        }`}
        disabled={issue.status === 'IN_PROGRESS'}
      >
        In Progress
      </Button>

      {/* Button for Closed */}
      <Button
        onClick={() => updateIssueStatus(issue.id, 'CLOSED')}
        className={`p-2 rounded ${
          issue.status === 'CLOSED' ? 'bg-red-500 text-white' : 'bg-gray-300'
        }`}
        disabled={issue.status === 'CLOSED'}
      >
        Closed
      </Button>
    </div>
  );
};

export default IssueStatusButtons;

'use client';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const IssuesPage = () => {
  interface Issue {
    id: number;
    title: string;
    description: string;
    status: string;
  }

  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/issues');
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-5">
      <h1 className="text-2xl font-bold mb-4">My Issues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {issues.length > 0 ? (

          issues.map((issue) => (
            <div
              key={issue.id}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-2">{issue.title.toUpperCase()}</h2>
              <p className="text-gray-700 mb-4">{issue.description}</p>
              <p className="text-sm font-medium text-blue-500">Status: {issue.status}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No issues found. Start by creating a new issue!
          </p>
        )
        }
      </div>
      <Button className='mt-4' size='3'>
        <Link href={'/issues/new'}>Create An Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;

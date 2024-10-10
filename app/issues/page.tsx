'use client';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { FaBugs } from "react-icons/fa6";
import IssueStatusButtons from '../status/IssueStatus';


const IssuesPage = () => {
  interface Issue {
    id: number;
    title: string;
    description: string;
    status: string;
  }

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/issues');
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchIssues();
  }, []);

  const deleteIssue = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch('/api/issues/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Send the issue ID in the body
      });

      if (response.ok) {
        // Remove the issue from the state after deletion
        setIssues(issues.filter((issue) => issue.id !== id));
        alert('Issue deleted successfully');
      } else {
        alert('Failed to delete the issue');
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
    } finally {
      setLoading(false);
    }
  };


  const updateIssueStatus = async (id: number, status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED') => {
    try {
      const response = await fetch('/api/issues/update-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update issue status');
      }
  
      const data = await response.json();
      window.location.reload();
      console.log('Issue status updated:', data);
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-2 space-y-5 font-sans">
      <h1 className="text-2xl font-bold mb-4 flex">My Issues <FaBugs /></h1>

      {loading ? ( // Show spinner while loading
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <div
                key={issue.id}
                className="border border-gray-300 rounded-lg p-4 shadow transition-all hover:scale-105 duration-200 space-y-2"
              >
                <h2 className="text-lg font-semibold mb-2">{issue.title.toUpperCase()}</h2>
                <p className="text-gray-500">{issue.description}</p>
                <p className="text-sm font-medium text-blue-600">Status: {issue.status}</p>
                <div className="flex space-x-2">
                <Button
                  onClick={() => deleteIssue(issue.id)}
                  className="text-red-500"
                >
                  {/* Show icon on small screens, text on larger screens */}
                  <span className="block sm:hidden">
                    <MdDeleteSweep color='black'/>
                  </span>
                  <span className="hidden sm:block">{loading?'Loading...':'Delete'}</span>
                </Button>
                <IssueStatusButtons issue={issue} updateIssueStatus={updateIssueStatus} />
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

      <Button className='mt-4' size='3'>
        <Link href={'/issues/new'}>Create An Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;

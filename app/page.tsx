export default function Home() {
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
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issue Tracker Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Issues</h2>
        
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">{issue.title}</h3>
              <p>{issue.description}</p>
              <p>
                <span className="font-semibold">Status:</span> {issue.status}
              </p>
              <p>
                <span className="font-semibold">Assignee:</span> {issue.assignee}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { Button } from "@radix-ui/themes";
import Link from "next/link";

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

  return (
    <div className="p-6 space-y-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-600 text-center">Issue Tracker <span className="block">Dashboard</span></h1>
      <p className="text-sm md:text-lg text-gray-500 mb-4 text-center">Struggling to track issues in your project?🤷🏿 Our issue tracker makes it easy! Log, assign, and prioritize tasks with a user-friendly interface, real-time updates, and seamless collaboration👌🏾. Whether you're a small team or managing a big project👨🏾‍💻, stay organized, save time⌚, and boost productivity📈. Get started today and streamline your workflow!🚀 </p>
      <div className="space-x-2 space-y-2">
        <Link href="/issues/new">
          <Button size={"3"}>
            Get Started!
          </Button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Some Issues Created by Our Clients</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">{issue.title}</h3>
              <p>
                <span className="font-semibold">Description:</span> {issue.description}
              </p>
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

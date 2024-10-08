interface Issue {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface TableProps {
    issues: Issue[];
}

const IssuesTable: React.FC<TableProps> = ({ issues }) => {
    return (
        <div className='p-4'>
            <h2 className="text-xl font-bold mb-4">Issues Table</h2>
            <table className="max-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Title</th>
                        <th className="py-2 px-4 border">Description</th>
                        <th className="py-2 px-4 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map(issue => (
                        <tr key={issue.id}>
                            <td className="py-2 px-4 border">{issue.id}</td>
                            <td className="py-2 px-4 border">{issue.title}</td>
                            <td className="py-2 px-4 border">{issue.description}</td>
                            <td className="py-2 px-4 border">{issue.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IssuesTable;

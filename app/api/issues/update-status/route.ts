import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'; // Adjust the path to prisma instance

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    // Validate the status
    const validStatuses = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // Update the status of the issue in the database
    const updatedIssue = await prisma.issue.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json({ message: 'Issue status updated', issue: updatedIssue }, { status: 200 });
  } catch (error) {
    console.error('Error updating issue status:', error);
    return NextResponse.json({ message: 'Error updating issue status', error }, { status: 500 });
  }
}

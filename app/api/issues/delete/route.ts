import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Issue ID is required' }, { status: 400 });
  }

  try {
    const deletedIssue = await prisma.issue.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Issue deleted successfully', issue: deletedIssue }, { status: 200 });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json({ message: 'Error deleting issue', error }, { status: 500 });
  }
}

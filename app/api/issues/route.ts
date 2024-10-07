import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchema";

// export async function POST(request: NextRequest) {
//     const body = await request.json();
//     const validation = createIssueSchema.safeParse(body);
//     if (!validation.success) {
//         return NextResponse.json(validation.error.format(), { status: 400 });
//     }

//     const newIssue = await prisma.issue.create({
//         data: {
//             title: body.title,
//             description: body.description
//         }
//     })
//     return NextResponse.json(newIssue, { status: 201 })
// }


// Handle POST and GET requests
export async function handler(request: NextRequest) {
  if (request.method === 'POST') {
    return await handlePost(request);
  } else if (request.method === 'GET') {
    return await handleGet();
  } else {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
}

// Handle POST request (creating a new issue)
async function handlePost(request: NextRequest) {
  const body = await request.json();
  
  // Validate the incoming request body against your schema
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Create new issue in the database
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  
  return NextResponse.json(newIssue, { status: 201 });
}

// Handle GET request (fetching all issues)
async function handleGet() {
  const issues = await prisma.issue.findMany(); // Fetch all issues from the database
  
  return NextResponse.json(issues, { status: 200 });
}

export { handler as GET, handler as POST };

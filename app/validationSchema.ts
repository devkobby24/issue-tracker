import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  status: z.string().min(1, "Status is required"),  // Add status field
  priority: z.string().min(1, "Priority is required"), // Add priority field
});

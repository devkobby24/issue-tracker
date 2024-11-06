"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic"; // Dynamically import SimpleMDE
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { useToast } from "@/hooks/use-toast";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../service/FireBaseConfig";

type IssueForm = z.infer<typeof createIssueSchema>;

interface User {
  name: string;
  email: string;
  user: string;
}

// Dynamically import SimpleMDE to load it only on the client side
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // Disable SSR
  loading: () => <Spinner />, // Show a spinner while loading the editor
});

const NewIssuePage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      status: "OPEN", // Set default status
      priority: "LOW", // Set default priority
    },
  });

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const userData = localStorage.getItem("user"); // Get user data from localStorage
      const user: User | null = userData ? JSON.parse(userData) : null; // Parse user data

      // Check if the user is logged in
      if (!user) {
        // Prompt user to log in or redirect to login page
        toast({ description: "You need to be logged in to submit an issue." });
        setSubmitting(false);
        return; // Exit early if user is not authenticated
      }

      // Use user's email or some unique identifier to create a unique document ID
      const uniqueId = `${user.email.replace(/[@.]/g, "_")}_${Date.now()}`; // Replace special characters in email
      // Note: Ensure that your user data is sanitized and does not contain special characters that might cause issues in Firestore

      // Use Firebase Firestore to save the issue
      await setDoc(doc(collection(db, "issues"), uniqueId), {
        ...data, // Spread the form data
        userEmail: user.email, // Include the user's email
        id: uniqueId, // Add the unique document ID
        createdAt: Date.now(), // Include the current timestamp
      });

      router.push("/issues"); // Redirect to the issues page
      toast({ description: "Issue created successfully" }); // Show success message
    } catch (error) {
      console.error("Error creating issue:", error); // Log the error
      setError("An error occurred while creating the issue."); // Set error state
      toast({ description: "An error occurred while creating the issue." }); // Show error message
    } finally {
      setSubmitting(false); // Ensure loading state is reset
    }
  });

  return (
    <div className="space-y-5 max-w-xl min-h-[100vh] px-4 mt-5">
      {error && (
        <Callout.Root>
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Issue Title" {...register("title")} />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SimpleMDE
              value={value || ""}
              onChange={onChange}
              placeholder="Description"
            />
          )}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <Button type="submit" disabled={isSubmitting} size="3" className="bg-blue-500 text-white hover:bg-blue-600">
          {isSubmitting ? <Spinner /> : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

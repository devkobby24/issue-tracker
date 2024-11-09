"use client";
import { Callout } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import { useToast } from "@/hooks/use-toast";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../service/FireBaseConfig";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <Spinner />,
});

const NewIssuePage = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      status: "OPEN",
      priority: "LOW",
    },
  });

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (!user) {
        toast({ description: "You need to be logged in to submit an issue." });
        setSubmitting(false);
        return;
      }

      const uniqueId = `${user.primaryEmailAddress?.emailAddress.replace(
        /[@.]/g,
        "_"
      )}_${Date.now()}`;

      await setDoc(doc(collection(db, "issues"), uniqueId), {
        ...data,
        userEmail: user.primaryEmailAddress?.emailAddress,
        id: uniqueId,
        createdAt: Date.now(),
      });

      router.push("/issues");
      toast({ description: "Issue created successfully" });
    } catch (error) {
      console.error("Error creating issue:", error);
      setError("An error occurred while creating the issue.");
      toast({ description: "An error occurred while creating the issue." });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="space-y-5 max-w-xl min-h-[85vh] px-4 mt-5">
      {error && (
        <Callout.Root>
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3 flex flex-col" onSubmit={onSubmit}>
        <Textarea
          placeholder="Issue Title"
          {...register("title")}
          className="border-gray-400 border rounded-md p-2"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SimpleMDE
              value={value || ""}
              onChange={onChange}
              placeholder="Description"
              className="border-gray-400 border rounded-md p-2"
            />
          )}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant={"default"}
          size={"default"}
          className="text-white hover:bg-blue-600"
        >
          {isSubmitting ? <Spinner /> : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

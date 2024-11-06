"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isSignedIn, user } = useUser(); // Access user directly from useUser
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      router.push("/issues/new");
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col flex-grow justify-center items-center p-4">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-[#003f8f] hover:bg-blue-700 text-white w-full py-2 rounded-lg",
              formButtonSecondary:
                "bg-gray-500 hover:bg-gray-600 text-white w-full py-2 rounded-lg",
              formFieldInput:
                "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full py-2 px-3 rounded-lg",
              formFieldLabel: "text-gray-700 text-sm",
              formTitle: "text-2xl font-semibold text-gray-800 mb-4",
              formDescription: "text-gray-600 text-center mb-4",
            },
          }}
        />
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { TokenResponse } from "@react-oauth/google";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IssuesCarousel from "./components/IssueCarousel";
import ImageComponent from "./components/ImageComponent";
import { issues } from "./Data";


interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

export default function Home() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => console.error("Login Failed:", error),
  });

  function handleLoginSuccess(
    tokenInfo: Omit<TokenResponse, "error" | "error_description" | "error_uri">
  ) {
    fetchUserProfile(tokenInfo)
      .then((userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setOpenDialog(false);
        router.push("/issues/new");
      })
      .catch((error) => console.error("Failed to fetch user profile:", error));
  }

  interface TokenInfo {
    access_token: string;
  }

  interface UserProfile {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
  }

  async function fetchUserProfile(tokenInfo: TokenInfo): Promise<UserProfile> {
    const { data } = await axios.get<UserProfile>(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      }
    );
    return data;
  }

  function handleGetStartedClick() {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
    } else {
      router.push("/issues/new");
    }
  }

  return (
    <div className="p-4 space-y-6 flex flex-col items-center min-h-[90vh] w-full">
      <HeaderSection />
      <Button size="lg" onClick={handleGetStartedClick}>
        Get Started!
      </Button>
      <IssuesCarousel issues={issues} />
      <ImageComponent />
      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} onLogin={login} />
    </div>
  );
}

function HeaderSection() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-gray-600 text-center">Issue Tracker</h1>
      <p className="text-lg text-gray-500 mb-4 text-center">
        Track and manage issues easily with our intuitive interface. Assign tasks, monitor progress, and streamline your workflow!
      </p>
    </>
  );
}

function LoginDialog({ open, onOpenChange, onLogin }: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <Image src="/bug-logo.png" alt="logo" className="rounded-full w-12 h-12" width={48} height={48} />
          <h2 className="font-bold text-lg mt-5">Sign In to Continue</h2>
        </DialogHeader>
        <DialogDescription className="text-center">
          <p className="mb-4">Use your Google account to sign in and start managing issues!</p>
          <Button onClick={onLogin} className="w-full flex items-center justify-center gap-3">
            <FcGoogle className="h-6 w-6" /> Continue with Google
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}


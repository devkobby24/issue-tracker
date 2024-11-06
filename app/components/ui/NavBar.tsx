"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs"

const NavBar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { user, isLoaded } = useUser();

  // Fetch user from localStorage initially and listen for changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
    };

    // Initialize user state
    handleStorageChange();

    // Add storage event listener
    window.addEventListener("storage", handleStorageChange);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "Dashboard", href: "/statistics" },
  ];


  return (
    <nav className="flex px-2 md:px-4 font-sans h-14 items-center justify-between shadow-md">
      <ul className="flex space-x-2 justify-center items-center">
        <Link href="/" aria-label="Home">
          <AiFillBug size={25} />
        </Link>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            className={classNames(
              "md:text-xl text-sm font-semibold md:p-2 rounded-md p-1",
              {
                "text-zinc-900 border border-gray-300 shadow-md": currentPath === href,
                "text-zinc-500": currentPath !== href,
                "hover:text-zinc-900 transition-colors": true,
              }
            )}
            href={href}
          >
            {label}
          </Link>
        ))}
      </ul>

      {/* Sign-In Button */}
      {!isLoaded ? ( // Show loading state if user data is not yet loaded
          <p >Loading...</p>
        ) : user ? (
          <UserButton />
        ) : (
          <div className="space-x-3">
            <Link href="/sign-in">
            <p
              className="px-4 py-2 text-blue-400 hover:text-blue-700"
            >
              sign-in
            </p>
            </Link>
          </div>
        )}
    </nav>
  );
};

// Define UserProfile interface for better type safety
interface UserProfile {
  picture?: string;
  // Add other user properties as needed
}

export default NavBar;

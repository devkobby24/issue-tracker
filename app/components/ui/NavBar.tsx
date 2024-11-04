"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null); // Define UserProfile type
  const currentPath = usePathname();

  // Fetch user from localStorage initially and listen for changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
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

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

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
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Image
              src={user?.picture || "/user.jpg"} // Fallback for user picture
              alt="User Profile"
              width={50}
              height={40}
              className="rounded-full w-9 h-9 cursor-pointer"
              priority={true}
            />
          </PopoverTrigger>
          <PopoverContent className="w-40 mx-4 my-2 pl-3 bg-transparent border-transparent">
            <Button onClick={handleLogout} className="flex items-center">
              Log Out
              <LiaDoorOpenSolid size={20} className="ml-1" />
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

// Define UserProfile interface for better type safety
interface UserProfile {
  picture?: string;
  // Add other user properties as needed
}

export default NavBar;

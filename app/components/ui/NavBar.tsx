"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const currentPath = usePathname();

  // Fetch user from localStorage initially
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for changes in localStorage (e.g., in case user logs in from another tab)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle Google Login
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data: userData } = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
            },
          }
        );

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

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
                "text-zinc-900 border border-gray-300 shadow-md":
                  currentPath === href,
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
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Image
                src={user.picture}
                alt="User Profile"
                width={40}
                height={40}
                className="rounded-full w-9 h-9 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-40 mx-4 my-2 pl-3 bg-transparent border-transparent">
              <Button onClick={handleLogout}>
                Log Out
                <LiaDoorOpenSolid size={20} />
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div>
            <Button size='sm' onClick={() => login()}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

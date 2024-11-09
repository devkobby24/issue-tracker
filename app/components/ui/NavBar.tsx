"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const currentPath = usePathname();
  const { user } = useUser();

  const links = [
    { label: "Home", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "Dashboard", href: "/statistics" },
  ];

  return (
    <nav className="flex px-2 md:px-4 font-sans h-14 items-center justify-between shadow-md fixed z-50 bg-white w-full">
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
            <li>{label}</li>
          </Link>
        ))}
      </ul>

      {/* Sign-In Button */}
      {user ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button className="px-4 py-2 rounded-md" variant="outline">
            sign-in
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;

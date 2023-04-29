"use client";

import { FC, useState } from "react";
import Link from "next/link";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";

import Button from "@/components/ui/Button";
import Image from "next/image";

interface HeaderProps {
  user?: User;
}

const Header: FC<HeaderProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    try {
      signOut();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto border-b-1 border-gray-400 p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4 text-gray-700">
          <div>Logo</div>
          <Link className="hover-underline-animation" href="/blogs">
            Blogs
          </Link>
          <Link className="hover-underline-animation" href="/profile">
            Profile
          </Link>
        </div>
        {user ? (
          <Button isLoading={isLoading} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <hr className="border-slate-200 my-2" />
    </div>
  );
};

export default Header;

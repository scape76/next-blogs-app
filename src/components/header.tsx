"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";

import Button from "@/components/ui/Button";
import Image from "next/image";
import { Icons } from "@/components/icons";
import header from "@/../public/logo.svg";
import { getCurrentUser } from "@/lib/session";
import UserAccountNav from "./user-account-nav";

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
      <div className="flex justify-between">
        <div className="flex gap-x-4 text-xl text-foreground items-center">
          <Link href="/">
            <div className="relative w-6 h-6 cursor-pointer">
              <Image fill src={header} alt="logo" />
            </div>
          </Link>
          <Link className="hover-underline-animation" href="/blogs">
            Blogs
          </Link>
          <Link className="hover-underline-animation" href="/profile">
            Profile
          </Link>
        </div>
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <hr className="border-slate-200 my-4" />
    </div>
  );
};

export default Header;

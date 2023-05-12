import { FC } from "react";
import Link from "next/link";
import type { User } from "next-auth";

import Button from "@/components/ui/Button";
import Image from "next/image";
import header from "@/../public/logo.svg";
import UserAccountNav from "@/components/user-account-nav";
import TranslatedText from "@/components/translation/translated-text";

interface HeaderProps {
  user?: User;
}

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <div className="max-w-5xl w-full mx-auto border-b-1 border-gray-400 p-4">
      <div className="flex justify-between">
        <div className="flex gap-x-4 text-2xl text-foreground items-center">
          <Link href="/">
            <div className="relative w-6 h-6 z-10 cursor-pointer">
              {/* <Image fill src={header} alt="logo" className="text-foreground stroke-current"/> */}
              <svg
                // width="36"
                // height="41"
                viewBox="0 0 36 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="none"
                className="w-full"
              >
                <path
                  d="M17.8 33.429L11.722 27.351C7.42292 23.052 0.158966 26.091 0.158966 32.169V40.1H35.441V15.788L17.8 33.429Z"
                  fill="currentColor"
                />
                <path
                  d="M17.8 6.67098L23.878 12.749C28.1771 17.0481 35.441 14.0091 35.441 7.93105V0H0.158966V24.312L17.8 6.67098Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
          <Link className="hover-underline-animation" href="/blogs">
            <TranslatedText tPath="header.blog" />
          </Link>
          <Link className="hover-underline-animation" href="/profile">
            <TranslatedText tPath="header.profile" />
          </Link>
        </div>
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Link href="/login">
            <Button>
              <TranslatedText tPath="buttons.login" />
            </Button>
          </Link>
        )}
      </div>
      <hr className="border-slate-200 my-4" />
    </div>
  );
};

export default Header;

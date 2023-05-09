import { FC} from "react";
import Link from "next/link";
import type { User } from "next-auth";

import Button from "@/components/ui/Button";
import Image from "next/image";
import header from "@/../public/logo.svg";
import UserAccountNav from "./user-account-nav";
import TranslatedText from "./translation/translated-text";

interface HeaderProps {
  user?: User;
}

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <div className="max-w-5xl w-full mx-auto border-b-1 border-gray-400 p-4">
      <div className="flex justify-between">
        <div className="flex gap-x-4 text-xl text-foreground items-center">
          <Link href="/">
            <div className="relative w-6 h-6 cursor-pointer">
              <Image fill src={header} alt="logo" className="text-foregound" />
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

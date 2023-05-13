"use client";

import * as React from "react";

import ThemeToggle from "@/components/theme-toggle";
import TranslatedText from "@/components/translation/translated-text";

interface SiteFooterProps {}

const SiteFooter: React.FC<SiteFooterProps> = ({}) => {
  return (
    <footer className="p-4 flex items-center justify-between flex-col gap-y-2 sm:flex-row">
      <div className="flex items-center gap-x-2 gap-y-2 flex-col sm:flex-row">
        <svg
          viewBox="0 0 36 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="none"
          className="w-[1.5rem]"
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
        <span>
          <TranslatedText tPath={"footer.images"} />{" "}
          <a href="https://popsy.co/" target="_blank">
            <u>Popsy</u>
          </a>
          .
        </span>
        <span className="ml-2">
          <TranslatedText tPath={"footer.thanks"} />{" "}
          <a href="https://github.com/shadcn" target="_blank">
            <u> Shadcn </u>
          </a>
        </span>
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default SiteFooter;

"use client";

import * as React from "react";

import DashboardHeader from "@/components/dashboard-header";
import DashboradShell from "@/components/shell";
import ThemeToggle from "@/components/theme-toggle";
import LanguageSelector from "@/components/language-selector";
import TranslatedText from "@/components/translation/translated-text";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <DashboradShell>
      <DashboardHeader
        titleTPath="profile.settings.header.title"
        textTPath="profile.settings.header.subtitle"
      />
      <div className="w-full flex justify-between">
        <TranslatedText tPath="profile.settings.theme" />
        <ThemeToggle />
      </div>
      <div className="w-full flex justify-between mt-4">
        <TranslatedText tPath="profile.settings.language" />
        <LanguageSelector />
      </div>
    </DashboradShell>
  );
};



export default page;

"use client";
import * as React from "react";

import { useTranslation } from "react-i18next";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import TranslatedText from "@/components/translation/translated-text";

interface LanguageSelectorProps {}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({}) => {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {i18n.language === "en" ? "🇬🇧" : "🇺🇦"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("uk-UA")}>
          🇺🇦 <TranslatedText tPath="translation.ukrainian" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
          🇬🇧 <TranslatedText tPath="translation.english" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

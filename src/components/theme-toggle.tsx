"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = ({}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-x-4">
      <Icons.moon
        className="w-6 h-6 cursor-pointer"
        onClick={() => setTheme("dark")}
      />
      <Icons.sun
        className="w-6 h-6 cursor-pointer"
        onClick={() => setTheme("light")}
      />
    </div>
  );
};

export default ThemeToggle;

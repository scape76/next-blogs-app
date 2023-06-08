"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import TranslatedText from "@/components/translation/translated-text";

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = ({}) => {
  const { theme, setTheme } = useTheme();

  const items = [
    {
      Icon: Icons.moon,
      theme: "dark",
      titleTPath: "theme.dark",
    },
    {
      Icon: Icons.sun,
      theme: "light",
      titleTPath: "theme.light",
    },
    {
      Icon: Icons.laptop,
      theme: "system",
      titleTPath: "theme.system",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {theme === "light" ? (
          <Icons.sun className="cursor-pointer text-foreground pointer-events-auto" />
        ) : (
          <Icons.moon className="cursor-pointer text-foreground pointer-events-auto" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map(({ Icon, theme, titleTPath }, i) => (
          <>
            <DropdownMenuItem
              onClick={() => {
                setTheme(theme.toLowerCase());
              }}
              key={`i-${titleTPath}`}
            >
              <Icon />
              <TranslatedText tPath={titleTPath} />
            </DropdownMenuItem>
          </>
        ))}
        {/* <DropdownMenuItem>
          <Icons.moon
            onClick={() => {
              setTheme("dark");
              setIsDropdownVisible(false);
            }}
          />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.moon
            onClick={() => {
              setTheme("light");
              setIsDropdownVisible(false);
            }}
          />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.moon
            onClick={() => {
              setTheme("system");
              setIsDropdownVisible(false);
            }}
          />
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // <button className="relative border border-gray-200" onClick={toggleDropdown}>
  //   Select your theme
  //   <div
  //     className={cn("absolute top-[1.6rem] flex flex-col flex-1", {
  //       hidden: isDropdownHidden,
  //     })}
  //   >
  //     <Icons.moon
  //       className="w-6 h-6 cursor-pointer text-foreground"
  //       onClick={() => setTheme("dark")}
  //     />
  //     <Icons.sun
  //       className="w-6 h-6 cursor-pointer"
  //       onClick={() => setTheme("light")}
  //     />
  //   </div>
  // </button>;
};

export default ThemeToggle;

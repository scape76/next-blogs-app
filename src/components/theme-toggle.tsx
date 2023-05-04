"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";

import Dropdown from "@/components/dropdown";

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = ({}) => {
  const { theme, setTheme } = useTheme();
  const [isDropdownVisible, setIsDropdownVisible] =
    React.useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const items = [
    {
      icon: <Icons.moon className="text-foreground" />,
      content: "Dark",
      onClick: () => {
        setTheme("dark");
        setIsDropdownVisible(false);
      },
    },
    {
      icon: <Icons.sun className="text-foreground" />,
      content: "Light",
      onClick: () => {
        setTheme("light");
        setIsDropdownVisible(false);
      },
    },
    {
      icon: <Icons.laptop className="text-foreground" />,
      content: "System",
      onClick: () => {
        setTheme("system");
        setIsDropdownVisible(false);
      },
    },
  ];

  return (
    <div className="relative">
      {theme === "light" ? (
        <Icons.sun
          className="cursor-pointer text-foreground relative"
          onClick={toggleDropdown}
        />
      ) : (
        <Icons.moon
          className="cursor-pointer text-foreground relative"
          onClick={toggleDropdown}
        />
      )}
      <Dropdown items={items} isVisible={isDropdownVisible} />
    </div>
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

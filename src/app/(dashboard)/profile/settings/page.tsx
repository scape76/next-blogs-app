import * as React from "react";

import DashboardHeader from "@/components/dashboard-header";
import ThemeToggle from "@/components/theme-toggle";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div className="w-full">
      <DashboardHeader title="Settings" text="Manage your website settings" />
      <div className="w-full flex justify-between">
        <p>Your theme</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default page;

import * as React from "react";

import Header from "@/components/header";
import { getCurrentUser } from "@/lib/session";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const user = await getCurrentUser();

  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default Layout;

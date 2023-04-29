import "./globals.css";
import { getCurrentUser } from "@/lib/session";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <Header user={user} />
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

"use client";

import { UserContextProvider } from "@/contexts/user/UserContextProvider";
import publicRoute from "@/hooks/publicRoute";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen flex overflow-hidden">{children}</div>;
}

export default publicRoute(Layout);

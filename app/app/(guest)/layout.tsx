"use client";

import { UserContextProvider } from "@/contexts/user/UserContextProvider";
import publicRoute from "@/hooks/publicRoute";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default publicRoute(Layout);

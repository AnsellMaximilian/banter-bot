"use client";

import { SettingsContextProvider } from "@/contexts/settings/SettingsContextProvider";
import { UserContextProvider } from "@/contexts/user/UserContextProvider";
import publicRoute from "@/hooks/publicRoute";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <SettingsContextProvider>{children}</SettingsContextProvider>
    </UserContextProvider>
  );
}

export default Layout;

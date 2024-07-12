"use client";

import { UserContextProvider } from "@/contexts/user/UserContextProvider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <div className="min-h-screen flex flex-col">{children}</div>
    </UserContextProvider>
  );
}

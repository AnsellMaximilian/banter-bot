"use client";

import { UserContextProvider } from "@/contexts/user/UserContextProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <div className="h-screen flex overflow-hidden">
        <Sidebar />
        <div className="grow h-full">
          <ScrollArea className="h-full overflow-y-auto">{children}</ScrollArea>
        </div>
      </div>
    </UserContextProvider>
  );
}

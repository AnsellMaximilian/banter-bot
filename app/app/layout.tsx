"use client";

import { UserContextProvider } from "@/contexts/user/UserContextProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <div className="h-screen flex overflow-hidden">
        <aside className="w-[400px] border-r border-border">Sidebar</aside>
        <div className="grow h-full">
          <ScrollArea className="h-full">
            {children}
            <div className="h-[2000px]"></div>
          </ScrollArea>
        </div>
      </div>
    </UserContextProvider>
  );
}

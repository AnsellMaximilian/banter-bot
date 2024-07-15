"use client";

import { UserContextProvider } from "@/contexts/user/UserContextProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import logo from "@/assets/icon.svg";

const But = () => {
  return (
    <li className="">
      <button className="block w-full h-20 border-border border-2 hover:bg-secondary hover:border-primary rounded-md uppercase font-semibold">
        Settings
      </button>
    </li>
  );
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <div className="h-screen flex overflow-hidden">
        <aside className="w-[360px] min-w-[360px] border-r-2 border-border p-4">
          <div className="p-4 flex gap-4 items-center">
            <Image src={logo} height={60} width={60} alt="logo" />
            <div className="text-2xl font-bold">Banter Bot</div>
          </div>
          <ul className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <But key={idx} />
            ))}
          </ul>
        </aside>
        <div className="grow h-full">
          <ScrollArea className="h-full overflow-y-auto">{children}</ScrollArea>
        </div>
      </div>
    </UserContextProvider>
  );
}

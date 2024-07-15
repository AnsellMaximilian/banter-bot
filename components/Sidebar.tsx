import Image from "next/image";
import React from "react";
import logo from "@/assets/icon.svg";
import { sidebarItems } from "@/const";
import Link from "next/link";

const SidebarButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className="">
      <Link
        href={href}
        className="flex justify-center items-center w-full h-20 border-border border-2 hover:bg-secondary hover:border-primary rounded-md uppercase font-semibold"
      >
        {label}
      </Link>
    </li>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-[360px] min-w-[360px] border-r-2 border-border p-4">
      <div className="p-4 flex gap-4 items-center">
        <Image src={logo} height={60} width={60} alt="logo" />
        <div className="text-2xl font-bold">Banter Bot</div>
      </div>
      <ul className="flex flex-col gap-4">
        {sidebarItems.map((item) => (
          <SidebarButton label={item.label} href={item.href} key={item.label} />
        ))}
      </ul>
    </aside>
  );
}

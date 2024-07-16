import Image from "next/image";
import React from "react";
import logo from "@/assets/icon.svg";
import { sidebarItems } from "@/const";
import Link from "next/link";
import { useUser } from "@/contexts/user/UserContext";

const SidebarButton = ({
  href,
  label,
  onClick,
}: {
  href?: string;
  label: string;
  onClick?: () => void;
}) => {
  const className =
    "flex justify-center items-center w-full h-16 border-border border-2 hover:bg-secondary hover:border-primary rounded-md uppercase font-semibold";
  return (
    <li className="">
      {href ? (
        <Link className={className} href={href}>
          {label}
        </Link>
      ) : (
        <button className={className} onClick={onClick}>
          {label}
        </button>
      )}
    </li>
  );
};

export default function Sidebar() {
  const { logout } = useUser();

  return (
    <aside className="w-[360px] min-w-[360px] border-r-2 border-border p-4 flex flex-col">
      <div className="p-4 flex gap-4 items-center">
        <Image src={logo} height={60} width={60} alt="logo" />
        <div className="text-2xl font-bold">Banter Bot</div>
      </div>
      <ul className="flex flex-col gap-4 grow">
        {sidebarItems.map((item) => (
          <SidebarButton label={item.label} href={item.href} key={item.label} />
        ))}

        <div className="mt-auto">
          <SidebarButton label="Logout" onClick={logout} />
        </div>
      </ul>
    </aside>
  );
}

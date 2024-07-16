import Image from "next/image";
import React from "react";
import logo from "@/assets/icon.svg";
import { sidebarItems } from "@/const";
import Link from "next/link";
import { useUser } from "@/contexts/user/UserContext";
import logoutIcon from "@/assets/icons/logout.svg";

const SidebarButton = ({
  href,
  label,
  onClick,
  icon,
}: {
  href?: string;
  label: string;
  onClick?: () => void;
  icon: string;
}) => {
  const className =
    "flex p-4 items-center w-full h-16 border-border border-2 hover:bg-secondary hover:border-primary rounded-md uppercase font-semibold gap-4 justify-start";
  return (
    <li className="">
      {href ? (
        <Link className={className} href={href}>
          <Image src={icon} width={35} height={35} alt={label} />
          <span className="hidden md:block">{label}</span>
        </Link>
      ) : (
        <button className={className} onClick={onClick}>
          <span className="hidden md:block">{label}</span>
        </button>
      )}
    </li>
  );
};

export default function Sidebar() {
  const { logout } = useUser();

  return (
    <aside className="w-[100px] md:w-[360px] min-w-[100px] md:min-w-[360px] border-r-2 border-border p-4 flex flex-col">
      <div className="p-4 flex gap-4 items-center">
        <Image src={logo} height={60} width={60} alt="logo" className="" />
        <div className="text-2xl font-bold hidden md:block">Banter Bot</div>
      </div>
      <ul className="flex flex-col gap-4 grow">
        {sidebarItems.map((item) => (
          <SidebarButton
            label={item.label}
            href={item.href}
            key={item.label}
            icon={item.icon}
          />
        ))}

        <div className="mt-auto">
          <SidebarButton label="Logout" onClick={logout} icon={logoutIcon} />
        </div>
      </ul>
    </aside>
  );
}

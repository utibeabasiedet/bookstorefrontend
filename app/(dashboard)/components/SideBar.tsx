"use client";
import React, { ReactNode, useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaRecycle } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiTwotoneLock } from "react-icons/ai";
import { FiUserCheck } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

interface SidebarMenuItem {
  label: string;
  icon: ReactNode;
  href: string;
  hrefId?: string;
}

const SidebarMenu = () => {
  const pather = usePathname();
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

  const topMenuItems: SidebarMenuItem[] = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      href: "/allpurchase",
    },
    {
      label: "Upload Book",
      icon: <FaBolt />,
      href: "/createbook",
    },
    // {
    //   label: "Retry Recharge",
    //   icon: <FaRecycle />,
    //   href: "/retry-recharge",
    // },
    // {
    //   label: "Transactions",
    //   icon: <FaClock />,
    //   href: "/transaction-history",
    // },
    
   
    // {
    //   label: "Update Password",
    //   icon: <AiTwotoneLock />,
    //   href: "/update-password",
    // },
    // {
    //   label: "Share To Friends",
    //   icon: <AiOutlineShareAlt />,
    //   href: "/sharetofriends",
    // },
  ];

  const bottomMenuItem: SidebarMenuItem = {
    label: "Logout",
    icon: <BiLogOut />,
    href: "/logout",
  };

  return (
    <aside className="w-[260px] fixe pt-[40px] z-50 bg-[#012E4A] flex flex-col justify-between h-[87vh]">
      <ul className="flex flex-col  text-white">
        {topMenuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <li
              className={`flex text-white items-center space-x-2 py-[12px] px-4 ${
                pather.startsWith(item.href)
                  ? "bg-white text-[#FF6700] border-l-4 border-[#FF6700]"
                  : ""
              }`}
              onClick={() => setActiveMenuItem(item.href)}
            >
              <span>{item.icon}</span>
              <span className="text-[14px]">{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>

      <div className="flex items-center space-x-2 border-t-[1px] border-[#4175DE] text-white pt-[24px] pb-[64px] px-4">
        <div>
          <span>
            <span>{bottomMenuItem.icon}</span>
          </span>
        </div>
        <Link href={bottomMenuItem.href}>
          <span>{bottomMenuItem.label}</span>
        </Link>
      </div>
    </aside>
  );
};

export default SidebarMenu;

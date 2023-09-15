"use client";

import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";
interface MenuItemProps {
  title: string;
  icon?: IconType;
  avatar?: string;
  activeIcon?: IconType;
  selected?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  selected,
  icon: Icon,
  activeIcon: ActiveIcon,
  avatar,
}) => {
  return (
    <Link
      href={avatar ? `/user/${title.toLowerCase()}` : `/${title.toLowerCase()}`}
    >
      <div
        className={`flex px-4 py-2 rounded-full items-center cursor-pointer gap-4 
     
       hover:bg-elife-700`}
      >
        {selected
          ? ActiveIcon && (
              <ActiveIcon className="w-8 h-8 cursor-pointer"></ActiveIcon>
            )
          : Icon && <Icon className="w-8 h-8 cursor-pointer"></Icon>}
        {avatar ? (
          <img src={avatar} className="rounded-full w-8 h-8"></img>
        ) : null}
        <span
          className={`text-xl font-thin text-elife-400 ${
            selected ? "font-bold text-[1.4rem]" : ""
          }`}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

export default MenuItem;

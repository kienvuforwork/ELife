"use client";

import { ReactNode } from "react";

interface MenuItemProps {
  title: string;
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, children, onClick }) => {
  return (
    <div className="flex cursor-pointer gap-4 " onClick={onClick}>
      <div>{children}</div>
      <span className="text-xl font-thin">{title}</span>
    </div>
  );
};

export default MenuItem;

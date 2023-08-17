"use client";

import { AiOutlineMenu } from "react-icons/ai";

import { useState, useEffect, useRef } from "react";
import Dropdown from "../dropdown";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="p-1 relative" onClick={toggleDropdown} ref={userMenuRef}>
      {" "}
      <AiOutlineMenu className="w-6 h-6 cursor-pointer"></AiOutlineMenu>{" "}
      {isOpen && <Dropdown type="test"></Dropdown>}
    </div>
  );
};

export default UserMenu;

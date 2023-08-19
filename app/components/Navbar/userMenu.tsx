"use client";

import { AiOutlineMenu } from "react-icons/ai";

import { useState, useEffect, useRef } from "react";
import DropdownItem from "../dropdownItem";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dummy = () => {
    return;
  };
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
    console.log("toogle");
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="p-1 relative" onClick={toggleDropdown} ref={userMenuRef}>
      {" "}
      <AiOutlineMenu className="w-6 h-6 cursor-pointer"></AiOutlineMenu>{" "}
      {isOpen && (
        <div className="absolute left-0 bg-elife-400 w-52 top-8 transform -translate-x-1/2 z-10 rounded-md focus:outline-none hover:outline-none">
          <DropdownItem name="Account setting" onClick={dummy}></DropdownItem>
          <DropdownItem name="Logout" onClick={dummy}></DropdownItem>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import DropdownItem from "../dropdownItem";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { clearUser } from "@/app/store/userSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const UserMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dummy = () => {
    return;
  };
  const dispatch: AppDispatch = useDispatch();
  const logout = () => {
    dispatch(clearUser()); // Assuming this clears the user data in your Redux store
    toast.success("Logged out!");
    router.push("");
    Cookies.remove("token");
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
      <AiOutlineMenu className="w-7 h-7 cursor-pointer"></AiOutlineMenu>{" "}
      {isOpen && (
        <div className="absolute left-0 bg-elife-400 w-52 top-8 transform -translate-x-1/2 z-10 rounded-md focus:outline-none hover:outline-none">
          <DropdownItem name="Account setting" onClick={dummy}></DropdownItem>
          <DropdownItem name="Logout" onClick={logout}></DropdownItem>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

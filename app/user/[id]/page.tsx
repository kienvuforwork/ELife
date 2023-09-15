"use client";
import { usePathname } from "next/navigation";

const UserProfile = () => {
  const pathanme = usePathname();
  return <p>Post: {pathanme}</p>;
};

export default UserProfile;

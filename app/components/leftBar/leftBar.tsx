"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import Avatar from "../avatar";
import Button from "../button";
import { onOpen as onOpenRegisterModal } from "@/app/store/registerModalSlice";
import { onOpen as onOpenLoginModal } from "@/app/store/loginModalSlice";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "@/app/store/userSlice";
import { useEffect, useState } from "react";
import Logo from "./logo";
import MenuItem from "./menuItem";
import { clearUser } from "@/app/store/userSlice";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { BiHomeCircle, BiSolidHomeCircle } from "react-icons/bi";
import { onOpen as onOpenShareModal } from "@/app/store/shareModalSlice";

interface LeftBarProps {
  currentUser: any;
}

const LeftBar: React.FC<LeftBarProps> = ({ currentUser }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const logout = () => {
    dispatch(clearUser()); // Assuming this clears the user data in your Redux store
    toast.success("Logged out!");
    router.push("");
    Cookies.remove("token");
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      dispatch(setUser({ ...currentUser }));
      setIsLoading(false);
    }
    if (!currentUser) {
      setIsLoading(false);
    }
  }, []);
  const user = useSelector((state: RootState) => state.userSlice);
  const pathname = usePathname().split("/")[1];
  console.log("render");
  return (
    <div className="h-[100vh] flex flex-col p-2 justify-start gap-6">
      <Logo></Logo>
      {!user?.username ? (
        <div className={`flex items-center  gap-2`}>
          {" "}
          <Button
            onClick={() => dispatch(onOpenLoginModal())}
            label="Sign in"
            isLoading={isLoading}
            sm
          ></Button>
          <Button
            onClick={() => dispatch(onOpenRegisterModal())}
            label="Sign up"
            sm
            isLoading={isLoading}
          ></Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-start items-start">
          <MenuItem
            title="Home"
            icon={BiHomeCircle}
            activeIcon={BiSolidHomeCircle}
            selected={"home" === pathname}
            key={1}
          ></MenuItem>
          <MenuItem
            title="asdf"
            icon={BiHomeCircle}
            activeIcon={BiSolidHomeCircle}
            selected={"asdf" === pathname}
            key={2}
          ></MenuItem>
          {/* <MenuItem title="Sign out" onClick={logout} icon={}>
            {" "}
            < className="w-7 h-7 cursor-pointer"></IoMdNotificationsOutline>
          </MenuItem> */}
          <Button
            label="Share the vibe"
            full
            onClick={() => dispatch(onOpenShareModal())}
          ></Button>
        </div>
      )}
    </div>
  );
};

export default LeftBar;
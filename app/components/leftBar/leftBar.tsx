"use client";
import Button from "../button";
import { onOpen as onOpenRegisterModal } from "@/app/store/registerModalSlice";
import { onOpen as onOpenLoginModal } from "@/app/store/loginModalSlice";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "@/app/store/userSlice";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import MenuItem from "./menuItem";
import { clearUser } from "@/app/store/userSlice";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import Cookies from "js-cookie";
import {
  BiHomeCircle,
  BiSolidHomeCircle,
  BiSolidUserCircle,
} from "react-icons/bi";
import { onOpen as onOpenShareModal } from "@/app/store/shareModalSlice";

interface LeftBarProps {
  currentUser: any;
}

const LeftBar: React.FC<LeftBarProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice);
  const logout = () => {
    dispatch(clearUser()); // Assuming this clears the user data in your Redux store
    toast.success("Logged out!");
    router.push("/");
    Cookies.remove("token");
    console.log(user);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      dispatch(
        setUser({ ...currentUser, notifications: currentUser.notifications })
      );

      setIsLoading(false);
    }
    if (!currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);
  const onOpen = () => {
    dispatch(onOpenRegisterModal());
    toggleOpen();
  };
  const onClose = () => {
    dispatch(onOpenLoginModal());
    toggleOpen();
  };
  const pathname = usePathname().split("/");
  return (
    <div className="h-[100vh] flex flex-col  p-2 justify-start gap-6 ">
      <div className="flex justify-between">
        {" "}
        <div className="text-2xl md:text-xl lg:text-2xl font-bold text-blue-600 cursor-pointer">
          ELIFE
        </div>
        <div
          className="text-xl block lg:hidden cursor-pointer"
          onClick={toggleOpen}
        >
          <AiOutlineMenu className="w-6 h-6 mb-6"></AiOutlineMenu>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col  bg-black border-elife-700 border-[1px] shadow-2xl fixed right-0 top-0 z-50 h-screen w-60 md:w-72 ">
          <div className="cursor-pointer content-end" onClick={toggleOpen}>
            <IoMdClose className="w-6 h-6 mb-6 mr-auto "></IoMdClose>
          </div>
          {!user?.username ? (
            <div className={`flex items-center flex-col gap-2`}>
              {" "}
              <Button
                onClick={onOpen}
                label="Sign in"
                isLoading={isLoading}
                full
              ></Button>
              <Button
                onClick={onClose}
                label="Sign up"
                full
                isLoading={isLoading}
              ></Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 justify-start items-start">
              {user.avatar ? (
                <MenuItem
                  title={user.username}
                  avatar={user.avatar}
                  selected={user.username === pathname[2]}
                  key={4}
                  link={`/user/${user.username.toLowerCase()}`}
                ></MenuItem>
              ) : (
                <MenuItem
                  title={user.username}
                  icon={BiSolidUserCircle}
                  activeIcon={BiSolidUserCircle}
                  selected={user.username === pathname[2]}
                  key={4}
                  link={`/user/${user.username.toLowerCase()}`}
                ></MenuItem>
              )}

              <MenuItem
                title="Home"
                icon={BiHomeCircle}
                activeIcon={BiSolidHomeCircle}
                selected={"home" === pathname[1]}
                key={1}
                link={`/home`}
              ></MenuItem>
              <MenuItem
                title="Notifications"
                icon={IoIosNotificationsOutline}
                activeIcon={IoIosNotifications}
                selected={"notifications" === pathname[1]}
                key={2}
                link={`/notifications`}
              ></MenuItem>

              <Button
                label="Share the vibe"
                full
                onClick={() => dispatch(onOpenShareModal())}
              ></Button>
            </div>
          )}
          <div className="flex-grow"></div>
          {user?.username ? (
            <Button label="Logout" full onClick={logout}></Button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LeftBar;

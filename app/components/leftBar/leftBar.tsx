"use client";
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
import { usePathname, useRouter } from "next/navigation";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import Cookies from "js-cookie";
import io from "socket.io-client";
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
  // const socket = io.connect("http://localhost:8080");

  // socket.on("notification", (message) => {
  //   console.log(message);
  // });
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice);
  const logout = () => {
    dispatch(clearUser()); // Assuming this clears the user data in your Redux store
    toast.success("Logged out!");
    router.push("/");
    Cookies.remove("token");
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

  const pathname = usePathname().split("/");
  return (
    <div className="h-[100vh] flex flex-col  p-2 justify-start gap-6">
      <Logo></Logo>
      {!user?.username ? (
        <div className={`flex items-center flex-col  gap-2`}>
          {" "}
          <Button
            onClick={() => dispatch(onOpenLoginModal())}
            label="Sign in"
            isLoading={isLoading}
            full
          ></Button>
          <Button
            onClick={() => dispatch(onOpenRegisterModal())}
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
  );
};

export default LeftBar;

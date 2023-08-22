"use client";
import UserMenu from "./userMenu";
import Notification from "./notification";
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

interface LeftBarProps {
  currentUser: any;
}

const LeftBar: React.FC<LeftBarProps> = ({ currentUser }) => {
  const dispatch: AppDispatch = useDispatch();
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
  return (
    <div className="h-[100vh] flex flex-col p-2 gap-6 justify-start">
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
        <div className="t gap-2">
          {" "}
          <Avatar></Avatar>
          <Notification></Notification>
          <UserMenu></UserMenu>
        </div>
      )}
    </div>
  );
};

export default LeftBar;

"use client";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
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
import { Suspense, useEffect, useState } from "react";
interface NavbarProps {
  currentUser?: {
    username: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
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
    <Container>
      <div className="grid grid-cols-12 py-4">
        <div className="col-span-3 flex justify-center">
          {" "}
          <Logo></Logo>
        </div>
        <div className="col-start-4 col-span-6 flex items-center justify-center">
          {" "}
          <Search></Search>
        </div>{" "}
        {!user?.username ? (
          <div className="flex items-center col-start-10 col-span-3 justify-center gap-2">
            {" "}
            {isLoading ? (
              <div className=" bg-gray-800 w-5 h-5 rounded-full animate-pulse "></div>
            ) : (
              <Button
                onClick={() => dispatch(onOpenLoginModal())}
                label="Sign in"
                sm
              ></Button>
            )}
            {isLoading ? (
              <div className=" bg-gray-800 w-5 h-5 rounded-full animate-pulse "></div>
            ) : (
              <Button
                onClick={() => dispatch(onOpenRegisterModal())}
                label="Sign up"
                sm
              ></Button>
            )}
          </div>
        ) : (
          <div className="flex items-center col-start-10 col-span-3 justify-center gap-2">
            {" "}
            <Avatar></Avatar>
            <Notification></Notification>
            <UserMenu></UserMenu>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Navbar;

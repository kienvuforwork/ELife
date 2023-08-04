"use client";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./userMenu";
import Notification from "./notification";
import Avatar from "../avatar";
import Dropdown from "../dropdown";
import Button from "../button";
import { onOpen as onOpenRegisterModal } from "@/app/store/registerModalSlice";
import { onOpen as onOpenLoginModal } from "@/app/store/loginModalSlice";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
interface NavbarProp {
  currentUser: null;
}

const Navbar: React.FC<NavbarProp> = ({ currentUser }) => {
  const dispatch: AppDispatch = useDispatch();
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
        </div>

        <div className="flex items-center relative col-start-10 col-span-3 justify-center gap-2">
          <Button
            onClick={() => dispatch(onOpenLoginModal())}
            label="Sign in"
            sm
          ></Button>
          <Button
            onClick={() => dispatch(onOpenRegisterModal())}
            label="Sign up"
            sm
          ></Button>
          {/* <Notification></Notification>
          <Avatar></Avatar>
          <UserMenu></UserMenu>
          <Dropdown></Dropdown> */}
        </div>
        {/* <Search></Search>
                    <Notification></Notification>
                    <UserMenu></UserMenu> */}
      </div>
    </Container>
  );
};

export default Navbar;

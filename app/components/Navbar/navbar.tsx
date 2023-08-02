"use client";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./userMenu";
import Notification from "./notification";
import Avatar from "../avatar";
import Dropdown from "../dropdown";
import { onClose, onOpen } from "@/app/store/dropdownSlice";
interface NavbarProp {
  currentUser: null;
}

const Navbar: React.FC<NavbarProp> = ({ currentUser }) => {
  return (
    <Container>
      <div className="flex flex-row items-center justify-between py-4">
        <Logo></Logo>
        <Search></Search>
        <div className="flex items-center relative">
          <Notification></Notification>
          <Avatar></Avatar>
          <UserMenu></UserMenu>
          <Dropdown></Dropdown>
        </div>
        {/* <Search></Search>
                    <Notification></Notification>
                    <UserMenu></UserMenu> */}
      </div>
    </Container>
  );
};

export default Navbar;

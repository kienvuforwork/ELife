"use client";

import Image from "next/image";
import logo from "../../public/images/logo.png";

const Logo = () => {
  return (
    <Image
      height={100}
      width={100}
      className="cursor:pointer width:auto"
      src={logo}
      alt="logo"
    ></Image>
  );
};

export default Logo;

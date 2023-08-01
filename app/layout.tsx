import { ReactNode } from "react";
import "./global.css";
import Navbar from "./components/Navbar/navbar";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "ELife",
  description: "Life style",
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-elife-700 text-white">
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

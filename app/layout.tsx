import { ReactNode } from "react";
import "./global.css";
import Navbar from "./components/Navbar/navbar";
import { Roboto } from "@next/font/google";
import Providers from "./providers/reduxProvider";
import RegisterModal from "./components/Modals/registerModal";
import LoginModal from "./components/Modals/loginModal";
interface RootLayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "ELife",
  description: "Life style",
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={roboto.className}>
      <Providers>
        <body className="bg-elife-700 text-white">
          <Navbar></Navbar>
          <RegisterModal></RegisterModal>
          <LoginModal></LoginModal>
          {children}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;

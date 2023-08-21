import { ReactNode, Suspense } from "react";
import "./global.css";
import Navbar from "./components/Navbar/navbar";
import { Roboto } from "@next/font/google";
import Providers from "./providers/reduxProvider";
import RegisterModal from "./components/Modals/registerModal";
import LoginModal from "./components/Modals/loginModal";
import ToasterProvider from "./providers/toasterProvider";
import { getCurrentUser } from "./actions/getCurrentUser";

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

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" className={roboto.className}>
      <Providers>
        <body className="bg-black text-white">
          <ToasterProvider></ToasterProvider>{" "}
          <Navbar currentUser={currentUser}></Navbar>
          <RegisterModal></RegisterModal>
          <LoginModal></LoginModal>
          {children}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;

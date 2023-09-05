import { ReactNode } from "react";
import "./global.css";
import { Roboto } from "@next/font/google";
import Providers from "./providers/reduxProvider";
import RegisterModal from "./components/Modals/registerModal";
import LoginModal from "./components/Modals/loginModal";
import ToasterProvider from "./providers/toasterProvider";
import { getCurrentUser } from "./actions/getCurrentUser";
import LeftBar from "./components/leftBar/leftBar";
import Container from "./components/container";
import RightBar from "./components/rightBar/rightBar";
import { getPopularTvShow, getTvShowGenre } from "./actions/Movie/getTvShow";
import ShareModal from "./components/Modals/shareModal";
import { getTopTracks } from "./actions/Music/getMusic";

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
  const movieData = await getPopularTvShow();
  const tvShowGenres = await getTvShowGenre();
  const { data, token } = await getTopTracks();

  // Now you can access the data and token values here
  return (
    <html lang="en" className={roboto.className}>
      <Providers>
        <body className="bg-black text-white">
          <ToasterProvider></ToasterProvider>
          <RegisterModal></RegisterModal>
          <ShareModal
            genres={tvShowGenres.genres}
            spotifyToken={token}
          ></ShareModal>
          <LoginModal></LoginModal>
          <Container>
            {" "}
            <div className="col-span-2  sticky top-0 h-screen">
              {" "}
              <LeftBar currentUser={currentUser}></LeftBar>
            </div>
            <div className="col-span-6"> {children}</div>
            <div className="col-span-4 sticky top-0 h-screen">
              {" "}
              <RightBar
                moviesData={movieData}
                trackData={data.tracks.items.slice(0, 20)}
              ></RightBar>
            </div>
          </Container>
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;

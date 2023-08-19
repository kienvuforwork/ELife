import data from "@/app/api/Music/data";
import Container from "../container";
import MainBar from "./mainBar";
import SideBar from "./sideBar";
import getMovies from "@/app/api/Movie/getMovie";

const Content = async () => {
  const movieData = await getMovies();
  const musicData = await data.chart_items;
  return (
    <Container>
      <div className="h-100 grid grid-cols-12 mt-5">
        <div className="col-start-3 col-span-6 h-5">
          <MainBar></MainBar>
        </div>
        <div className="col-span-4 xl:col-span-3 border-2 border-elife-700">
          <SideBar moviesData={movieData} musicData={musicData}></SideBar>
        </div>
      </div>
    </Container>
  );
};

export default Content;

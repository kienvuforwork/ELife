"use client";
import Container from "../container";
import MainBar from "./mainBar";
import SideBar from "./sideBar";
const Content = () => {
  return (
    <Container>
      <div className="h-100 border-4 border-blue-300 grid grid-cols-12 mt-5">
        <div className="col-span-4 xl:col-span-3">
          <SideBar></SideBar>
        </div>
        <div className="xl:col-span-6 md:col-span-7 col-span-8 h-5 bg-blue-500">
          <MainBar></MainBar>
        </div>
      </div>
    </Container>
  );
};

export default Content;

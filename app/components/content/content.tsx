"use client";
import Container from "../container";
import MainBar from "./mainBar";
import SideBar from "./sideBar";
const Content = () => {
  return (
    <Container>
      <div className="h-100 grid grid-cols-12 mt-5">
        <div className="xl:col-span-8 col-span-8 h-5">
          <MainBar></MainBar>
        </div>
        <div className="col-span-4 xl:col-span-3">
          <SideBar></SideBar>
        </div>
      </div>
    </Container>
  );
};

export default Content;

import { Fragment } from "react";
import Post from "./post";

export default async function Home() {
  return (
    <Fragment>
      <div className="border-2 border-elife-700 h-[2000px] w-full pt-2 flex flex-col gap-2">
        <div className="text-center text-xl">Discover What's Trending </div>
        <Post></Post>
      </div>
    </Fragment>
  );
}

import { Fragment, Suspense } from "react";
import Post from "../components/card/post";
import Loader from "../components/loader";

export default async function Home() {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <Fragment>
        <div className="border-2 border-elife-700 h-[2000px] w-full pt-2 flex flex-col gap-2">
          <div className="text-center text-xl">Discover What's Trending </div>
          {/* <Post ></Post> */}
        </div>
      </Fragment>
    </Suspense>
  );
}

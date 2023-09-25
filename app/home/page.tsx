"use client";
import { Fragment, useEffect, useState } from "react";
import Post from "../components/card/post";
import Loader from "../components/loader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("http://localhost:8080/user/following/posts", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setPosts(data.posts[0]);
      console.log(data);
    };
    getPost();
    setIsLoading(false);
  }, []);
  return !isLoading ? (
    <Fragment>
      <div className="border-2 border-elife-700  w-full pt-2 flex flex-col gap-2">
        <div className="text-center text-xl">Discover What's Trending </div>
        {posts.map((post: any, index) => (
          <Post
            username={post.username}
            key={index}
            data={post.data}
            type={post.type}
            date={post.customDate}
            isLoggedIn={true}
          ></Post>
        ))}
      </div>
    </Fragment>
  ) : (
    <Loader></Loader>
  );
};
export default Home;

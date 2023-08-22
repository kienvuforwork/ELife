"use client";

import AddPost from "./addPost";

const MainBar = () => {
  return (
    <div className="border-2 h-screen border-elife-700 mr-2 border-opacity-30">
      <div className="text-2xl text-elife-600 cursor-pointer">Home</div>
      <AddPost></AddPost>
    </div>
  );
};

export default MainBar;

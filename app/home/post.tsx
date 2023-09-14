import { TvShowModel } from "../Model/Movie";
import { Track } from "../Model/Music";

interface PostProps {
  username: string;
  data: TvShowModel | Track;
  recommend?: boolean;
  vibes?: string[];
}

const Post = () => {
  return (
    <div className=" flex justify-center items-center border-t-2 border-b-2 border-elife-700">
      <div className=" text-white rounded-lg  w-full space-y-6 p-10">
        <div className="flex space-x-4 items-center ">
          <div className="w-12 h-12">
            <img src="" alt="" />
          </div>
          <div className="space-y-2">
            <div className="flex space-x-2 items-center">
              <h2 className="text-base"> John Doe </h2>
              {/* <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg> */}
              <div className=" text-xs text-elife-500">is</div>
            </div>
            <p className=" text-xs text-elife-500">5 Minutes Ago</p>
          </div>
        </div>

        <div>
          <p className="text-sm leading-6 text-elife-400">
            Hypnosis at the parallel universe was the advice of alarm, commanded
            to a conscious ship. Processors experiment with paralysis!
          </p>
        </div>

        <div className="flex justify-between pt-5 text-sm">
          Recommended
          <div className="text-elife-600 text-sm">
            <div>Add now +</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

"use client";

import { TvShowModel } from "@/app/Model/Movie";
import SearchResultItem from "./searchResultItem";
import { MusicModel } from "@/app/Model/Music";

interface SearchResultListProps {
  text?: string | undefined;
  tvShowList?: TvShowModel[];
  musicList?: MusicModel[];
  right?: boolean;
  onClose: () => void;
  onChoose: (data: MusicModel | TvShowModel) => void;
  isLoading: boolean | undefined;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  text,
  onChoose,
  tvShowList,
  isLoading,
  onClose,
}) => {
  if (!isLoading && tvShowList?.length === 0 && text !== "") {
    return (
      <div className="absolute w-[120%] transform  bg-black top-[100%] rounded-lg border-[1px] border-elife-700 h-20 flex justify-center items-center">
        No result found!{" "}
      </div>
    );
  }
  return text ? (
    <div
      className={`absolute w-[120%] transform  bg-black top-[100%] rounded-lg border-[1px] border-elife-700 h-52 overflow-y-auto scrollbar-none`}
    >
      {tvShowList?.map((tvShow, index) =>
        tvShow.poster_path && tvShow.backdrop_path ? (
          <SearchResultItem
            onChoose={onChoose}
            onClick={onClose}
            img={`https://image.tmdb.org/t/p/w200/${
              tvShow.poster_path !== null
                ? tvShow.poster_path
                : tvShow.backdrop_path
            }`}
            name={tvShow.name}
            key={index}
            dataType="tvShow"
            data={tvShow}
          ></SearchResultItem>
        ) : null
      )}
    </div>
  ) : null;
};

export default SearchResultList;

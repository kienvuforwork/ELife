"use client";

interface SearchResultListProps {
  text?: string | undefined;
  isMovie?: boolean;
  isMusic?: boolean;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  text,
  isMovie,
  isMusic,
}) => {
  return (
    <div className="absolute h-6 w-[110%] bg-elife-700  top-[100%] rounded-lg ">
      {text}
    </div>
  );
};

export default SearchResultList;

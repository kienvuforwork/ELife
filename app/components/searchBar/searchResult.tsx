"use client";

interface SearchResultProps {
  result?: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return <div>{result}</div>;
};

export default SearchResult;

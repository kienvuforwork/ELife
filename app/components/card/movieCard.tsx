"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import CardLoadingSkeleton from "./cardLoadingSkeleton";
interface MovieCardProps {
  image_src: string;
  name: string;
  rating: number;
  isLoading?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  image_src,
  name,
  rating,
  isLoading,
}) => {
  const convertRatingOutOf10ToOutOf5 = (ratingOutOf10: number) => {
    // Ensure the input is within the valid range
    if (ratingOutOf10 < 0 || ratingOutOf10 > 10) {
      throw new Error("Rating out of range. It should be between 0 and 10.");
    }

    // Convert the rating to a scale of 5
    const ratingOutOf5: number = ratingOutOf10 / 2;

    const fullStars = Math.floor(ratingOutOf5); // Number of full stars
    const halfStar = ratingOutOf5 - fullStars; // Whether to show a half star
    return { fullStars, halfStar };
  };
  const { fullStars, halfStar } = convertRatingOutOf10ToOutOf5(rating);

  const fullStarsIcon = () => {
    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ color: "yellow" }}
          className="xl:w-5 xl:h-5 h-3 w-3 mr-1"
        />
      );
    }
    return <div>{starIcons}</div>;
  };

  const halfStarsIcon = () => {
    if (halfStar) {
      return (
        <div>
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            style={{ color: "yellow" }}
            className="xl:w-5 xl:h-5 h-3 w-3 mr-1  "
          />
        </div>
      );
    }
  };

  if (isLoading) {
    return <CardLoadingSkeleton></CardLoadingSkeleton>;
  }

  return (
    <div className="flex xl:gap-5 gap-2 w-full xl:p-5 md:p-3 p-1 border-t-2 border-elife-700 hover:bg-elife-700 ">
      <div className="w-1/3">
        {" "}
        <img src={image_src} className="w-full"></img>
      </div>
      <div className="flex flex-col w-2/3 gap-2">
        <div className="xl:text-lg font-medium text-sm text-elife-500 hover:cursor-pointer">
          <a>{name}</a>
        </div>
        <div className="xl:text-sm text-xs"> {rating.toFixed(2)} </div>
        <div className="flex items-center">
          {fullStarsIcon()}
          {halfStarsIcon()}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

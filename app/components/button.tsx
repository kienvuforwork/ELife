"use client";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  full?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  sm,
  md,
  lg,
  full,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl hover:opacity-70  transition bg-blue-700 py-2 text-lg ${
        full ? "w-full" : ""
      } ${
        sm
          ? "lg:text-lg md:text-md text-sm xl:px-6 md:p-4  md:py-1.5 sm:px-2.5 sm:py-1 px-1.5 py-1 rounded-full "
          : ""
      }`}
    >
      {" "}
      {label}
    </button>
  );
};

export default Button;

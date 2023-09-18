"use client";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  full?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  sm,
  md,
  lg,
  full,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl hover:opacity-70  transition-all duration-300 bg-blue-700 py-2 ${
        isLoading
          ? "bg-gray-800   rounded-full text-gray-800 animate-pulse "
          : ""
      }  ${full ? "w-full text-lg" : ""} ${sm ? "px-6 rounded text-sm" : ""}`}
    >
      {" "}
      {label}
    </button>
  );
};

export default Button;

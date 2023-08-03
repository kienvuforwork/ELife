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
      } `}
    >
      {" "}
      {label}
    </button>
  );
};

export default Button;

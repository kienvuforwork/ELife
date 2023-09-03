"use client";

import { useState, useEffect } from "react";

interface ChipProps {
  title: string;
  addChip?: (title: string) => void;
  removeChip?: (title: string) => void;
  disabled?: boolean;
  selected?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  title,
  addChip,
  removeChip,
  disabled,
  selected,
}) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (removeChip && selected) {
      removeChip(title);
      return;
    }
    addChip && addChip(title);
  };
  return (
    <div
      onClick={handleClick}
      className={`center relative inline-block cursor-pointer whitespace-nowrap rounded-lg  py-1 px-2.5 align-baseline text-sm leading-none  ${
        selected ? "bg-elife-600 text-elife-700" : "bg-elife-700 text-blue-400"
      }  `}
    >
      <div className="mt-px">{title}</div>
    </div>
  );
};

export default Chip;

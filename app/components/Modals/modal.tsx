"use client";
import { useCallback } from "react";

import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  bgWhite?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
  bgWhite,
}) => {
  return isOpen ? (
    <div
      className={` ${
        disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""
      } fixed top-0 left-0 right-0 bottom-0  bg-elife-700 bg-opacity-50 flex items-center justify-center`}
    >
      <div
        className={`flex flex-col items-center justify-center  ${
          bgWhite ? "bg-elife-400" : "bg-black"
        } h-auto md:w-1/2 xl:w-1/4 my-6 py-5 z-10 shadow-xl rounded-md px-4 translate duration-300 
      `}
      >
        {/* TITLE */}

        <div className="w-full ">
          {" "}
          <IoMdClose
            size={24}
            className={`ml-auto cursor-pointer   ${
              bgWhite ? "fill-black" : ""
            }`}
            onClick={() => onClose()}
          ></IoMdClose>
          <div className="flex items-center justify-center w-full border-b border-1 border-eflie-500 pb-2">
            {title}
          </div>{" "}
        </div>

        {body}
        {footer}
      </div>
    </div>
  ) : null;
};

export default Modal;

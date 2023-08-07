"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px]  mx-auto 2xl:px-40 xl:px-30  md:px-5 sm:px-3 px-2">
      {children}
    </div>
  );
};

export default Container;

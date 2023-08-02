"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px]  mx-auto xl:px-100 md:px-80 sm:px-40 px-4">
      {children}
    </div>
  );
};

export default Container;

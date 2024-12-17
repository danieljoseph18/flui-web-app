import Image from "next/image";
import React from "react";

const LoadingScreen = ({
  loadingPercentage,
}: {
  loadingPercentage: number;
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
      <Image
        src={"/images/common/flui-frog.png"}
        alt="Flui the Frog"
        width={600}
        height={600}
        className="w-52 animate-pop-in"
      />

      {/* Loading Bar */}
      <div className="w-64 bg-white rounded-2xl p-1">
        <div
          className="bg-main-green h-2 rounded-2xl transition-all duration-300 ease-out"
          style={{ width: `${loadingPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;

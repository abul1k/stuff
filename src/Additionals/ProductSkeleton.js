import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

import "../styles/Skeleton.css";

const ProductSkeleton = () => {
  const { theme } = useSelector(({ layout }) => layout);

  return (
    <div className="productSkeleton">
      <Skeleton
        baseColor={theme === "light" ? "#959393" : "#202020"}
        highlightColor={theme === "light" ? "#cccccc" : "#262626"}
        duration={1.5}
        width={375}
        height={375}
      />
      <div>
        <Skeleton
          baseColor={theme === "light" ? "#959393" : "#202020"}
          highlightColor={theme === "light" ? "#cccccc" : "#262626"}
          duration={1.5}
          width={500}
          height={90}
          className="mb"
        />
        <Skeleton
          baseColor={theme === "light" ? "#959393" : "#202020"}
          highlightColor={theme === "light" ? "#cccccc" : "#262626"}
          duration={1.5}
          width={500}
          height={90}
          className="mb"
        />
        <Skeleton
          baseColor={theme === "light" ? "#959393" : "#202020"}
          highlightColor={theme === "light" ? "#cccccc" : "#262626"}
          duration={1.5}
          width={500}
          height={168}
          className="mb"
        />
      </div>
    </div>
  );
};

export default ProductSkeleton;

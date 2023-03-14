import React from "react";
import Skeleton from "react-loading-skeleton";

import "../styles/Skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="productSkeleton">
      <Skeleton
        baseColor="#202020"
        highlightColor="#444"
        duration={1.5}
        width={375}
        height={375}
      />
      <div>
        <Skeleton
          baseColor="#202020"
          highlightColor="#444"
          duration={1.5}
          width={500}
          height={90}
          className="mb"
        />
        <Skeleton
          baseColor="#202020"
          highlightColor="#444"
          duration={1.5}
          width={500}
          height={90}
          className="mb"
        />
        <Skeleton
          baseColor="#202020"
          highlightColor="#444"
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

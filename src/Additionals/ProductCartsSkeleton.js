import React from "react";
import ContentLoader from "react-content-loader";
import { useSelector } from "react-redux";

import "../styles/Skeleton.css";

const ProductCartsSkeleton = (props) => {
  const { theme } = useSelector(({ layout }) => layout);

  const rows = 1;
  const columns = 5;
  const coverHeight = 542;
  const coverWidth = 226;
  const padding = 25;
  const speed = 1;

  const coverHeightWithPadding = coverHeight + padding;
  const coverWidthWithPadding = coverWidth + padding;
  const initial = 35;
  const covers = Array(columns * rows).fill(1);

  return (
    <div className="product-carts">
      <ContentLoader
        speed={speed}
        width={columns * coverWidthWithPadding}
        height={rows * coverHeightWithPadding}
        backgroundColor={theme === "light" ? "#959393" : "#202020"}
        foregroundColor={theme === "light" ? "#cccccc" : "#262626"}
        {...props}
      >
        {covers.map((g, i) => {
          let vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
          let vx =
            (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
          return (
            <rect
              key={i}
              x={vx}
              y={vy}
              rx="0"
              ry="0"
              width={coverWidth}
              height={coverHeight}
            />
          );
        })}
      </ContentLoader>
    </div>
  );
};

export default ProductCartsSkeleton;

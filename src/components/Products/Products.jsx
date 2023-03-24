import React from "react";
import { Link } from "react-router-dom";

import  "../../styles/Products.css";

const Products = ({ title, style = {}, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={"cart-products"} style={style}>
      {title && <h2>{title}</h2>}

      <div className={"product-cart-list"}>
        {list.map(({ id, images, title, category: { name: cat }, price }) => (
          <Link to={`/products/${id}`} key={id} className={"product-cart-product"}>
            <div
              className={"product-cart-image"}
              style={{ backgroundImage: `url(${images[0]})` }}
            />

            <div className={"product-cart-wrapper"}>
              <h3 className={"product-cart-title"}>{title}</h3>
              <div className={"product-cart-cat"}>{cat}</div>
              <div className={"product-cart-info"}>
                <div className={"product-cart-prices"}>
                  <div className={"product-cart-price"}>{price}$</div>
                  <div className={"product-cart-oldPrice"}>{Math.floor(price * 0.8)}$</div>
                </div>

                <div className={"product-cart-purchases"}>
                  {Math.floor(Math.random() * 20 + 1)} purchased
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;

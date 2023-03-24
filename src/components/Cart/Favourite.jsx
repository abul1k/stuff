import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromFavourite,
  addItemToCart,
} from "../../features/user/userSlice";

import "../../styles/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { favourite } = useSelector(({ user }) => user);

  const removeItem = (id) => {
    dispatch(removeItemFromFavourite(id));
  };

  const addToCard = (item) => {
    dispatch(addItemToCart(item));
    dispatch(removeItemFromFavourite(item.id));
  };

  return (
    <section className={"cart"}>
      <h2>Your favourite products</h2>

      {!favourite.length ? (
        <div className={"empty"}>Here is empty</div>
      ) : (
        <>
          <div className={"list"}>
            {favourite.map((item) => {
              const { title, category, images, price, id } = item;

              return (
                <div className={"item"} key={id}>
                  <div
                    className={"cart-image"}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={"info"}>
                    <h3 className={"name"}>{title}</h3>
                    <div className={"category"}>{category.name}</div>
                  </div>

                  <div className={"price"}>{price}$</div>

                  <button className={"toCart"} onClick={() => addToCard(item)}>
                    Add to card
                  </button>

                  <div className={"close"} onClick={() => removeItem(item.id)}>
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;

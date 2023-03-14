import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromFavourite,
  addItemToCart,
} from "../../features/user/userSlice";

import styles from "../../styles/Cart.module.css";

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
    <section className={styles.cart}>
      <h2 className={styles.title}>Your favourite products</h2>

      {!favourite.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {favourite.map((item) => {
              const { title, category, images, price, id } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <button
                    className={styles.toCart}
                    onClick={() => addToCard(item)}
                  >
                    Add to card
                  </button>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
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

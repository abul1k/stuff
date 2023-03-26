import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../utils/routes";

import "../../styles/Product.css";

import {
  addItemToCart,
  addItemToFavourite,
  removeItemFromFavourite,
} from "../../features/user/userSlice";
import { useTranslation } from "react-i18next";

const SIZES = [4, 4.5, 5];

const Product = (item) => {
  const { t } = useTranslation();
  const { title, price, images, description } = item;

  const favouriteItem = useSelector((state) => state.user.favourite);

  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  const addToCart = () => {
    dispatch(addItemToCart(item));
  };

  const favItem = favouriteItem.find(({ id }) => id === item.id);
  const favItemId = favItem && favItem.id;

  const addToFavourite = () => {
    dispatch(addItemToFavourite(item));
  };

  const deleteFromFavourite = () => {
    dispatch(removeItemFromFavourite(item.id));
  };

  return (
    <section className={"product"}>
      <div className={"product-images"}>
        <div
          className={"product-current"}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={"product-images-list"}>
          {images.map((image, i) => (
            <div
              key={i}
              className={"product-image"}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={"product-info"}>
        <h1 className={"product-title"}>{title}</h1>
        <div className={"product-price"}>{price}$</div>
        <div className={"product-color"}>
          <span>{t("products.color")}:</span> Green
        </div>
        <div className={"product-sizes"}>
          <span>{t("products.sizes")}:</span>

          <div className={"product-list"}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${"size"} ${currentSize === size ? "active" : ""}`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={"product-description"}>{description}</p>

        <div className={"product-actions"}>
          <button
            onClick={addToCart}
            className={"product-add"}
            disabled={!currentSize}
          >
            {t("actions.addToCart")}
          </button>
          {item.id === favItemId ? (
            <button
              onClick={deleteFromFavourite}
              className={"product-favourite"}
            >
              {t("actions.removeFromFavorites")}
            </button>
          ) : (
            <button
              onClick={addToFavourite}
              className={"product-favourite"}
              disabled={!currentSize}
            >
              {t("actions.addToFavourites")}
            </button>
          )}
        </div>

        <div className={"product-bottom"}>
          <div className={"product-purchase"}>19 {t("actions.purchased")}</div>

          <Link to={ROUTES.HOME}>{t("actions.returnToStore")}</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;

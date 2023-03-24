import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// i18n
import { useTranslation } from "react-i18next";
import "../../utils/i18n";

import styles from "../../styles/Header.module.css";

import { ROUTES } from "../../utils/routes";

import AVATAR from "../../images/user.png";

import SUN from "../../images/sunny.png";
import MOON from "../../images/moon.png";

import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { toggleTheme } from "../../features/layout/layoutSlice";

const Header = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useSelector(({ layout }) => layout);

  const [searchValue, setSearchValue] = useState("");
  const { currentUser, cart, favourite } = useSelector(({ user }) => user);

  const [values, setValues] = useState({ email: "", avatar: AVATAR });

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const selectedLang = ({ target }) => i18n.changeLanguage(target.value);
  const lang = localStorage.getItem("i18nextLng");

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          {/* <img src={LOGO} alt="Stuff" /> */}
          <div className="flex flex-align">
            <img
              className={styles.logotype}
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="Stuff"
            />
            <h1 className={styles.name}>TUFF</h1>
          </div>
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.actions}>
          <select
            className={styles.langchoise}
            value={lang || "ru"}
            onInput={selectedLang}
          >
            <option value="ru">ru</option>
            <option value="en">en</option>
          </select>
          {theme === "light" ? (
            <img
              className={styles.theme}
              src={MOON}
              alt="dark"
              onClick={() => dispatch(toggleTheme("dark"))}
            />
          ) : (
            <img
              className={styles.theme}
              src={SUN}
              alt="light"
              onClick={() => dispatch(toggleTheme("light"))}
            />
          )}
        </div>
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anyting..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading"
                : !data.length
                ? "No results"
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={styles.item}
                        to={`/products/${id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.FAVOURITE} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            {!!favourite.length && (
              <span className={styles.count}>{favourite.length}</span>
            )}
          </Link>

          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>

          <div className={styles.user} onClick={handleClick}>
            {values.email ? (
              <div>
                <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${AVATAR})` }}
                />
                <span className={styles.username}>
                  {values.email.split("@")[0]}
                </span>
              </div>
            ) : (
              <button className={styles.signInBtn}>{t("header.signIn")}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

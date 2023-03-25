import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// i18n
import { useTranslation } from "react-i18next";
import "../../utils/i18n";

import "../../styles/Header.css";

import { ROUTES } from "../../utils/routes";

import AVATAR from "../../images/user.png";

import SUN from "../../images/sunny.png";
import MOON from "../../images/moon.png";

import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { toggleTheme } from "../../features/layout/layoutSlice";

const Header = () => {
  const { i18n, t } = useTranslation();

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
    <div className={"header"}>
      <div className={"header-logo"}>
        <Link to={ROUTES.HOME}>
          {/* <img src={LOGO} alt="Stuff" /> */}
          <div className="flex flex-align">
            <img
              className={"header-logotype"}
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="Stuff"
            />
            <h1 className={"header-name"}>TUFF</h1>
          </div>
        </Link>
      </div>

      <div className={"header-info"}>
        <div className={"header-actions"}>
          <select
            className={"header-langchoise"}
            value={lang || "ru"}
            onInput={selectedLang}
          >
            <option value="ru">ru</option>
            <option value="en">en</option>
          </select>
          {theme === "light" ? (
            <img
              className={"header-theme"}
              src={MOON}
              alt="dark"
              onClick={() => dispatch(toggleTheme("dark"))}
            />
          ) : (
            <img
              className={"header-theme"}
              src={SUN}
              alt="light"
              onClick={() => dispatch(toggleTheme("light"))}
            />
          )}
        </div>
        <form className={"header-form"}>
          <div className={"header-icon"}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={"header-input"}>
            <input
              type="search"
              name="search"
              placeholder={t("header.searchInput")}
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={"header-box"}>
              {isLoading
                ? t("header.loading")
                : !data.length
                ? t("header.noResults")
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={"header-item"}
                        to={`/products/${id}`}
                      >
                        <div
                          className={"header-image"}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={"header-title"}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>

        <div className={"header-account"}>
          <Link to={ROUTES.FAVOURITE} className={"header-favourites"}>
            <svg className={"header-icon-fav"}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            {!!favourite.length && (
              <span className={"header-count"}>{favourite.length}</span>
            )}
          </Link>

          <Link to={ROUTES.CART} className={"header-cart"}>
            <svg className={"header-icon-cart"}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={"header-count"}>{cart.length}</span>
            )}
          </Link>

          <div className={"header-user"} onClick={handleClick}>
            {values.email ? (
              <div>
                <div
                  className={"header-avatar"}
                  style={{ backgroundImage: `url(${AVATAR})` }}
                />
                <span className={"header-username"}>
                  {values.email.split("@")[0]}
                </span>
              </div>
            ) : (
              <button className={"header-signInBtn"}>
                {t("header.signIn")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

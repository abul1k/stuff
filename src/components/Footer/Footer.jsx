import React from "react";
import { Link } from "react-router-dom";

import "../../styles/Footer.css";
import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.svg";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();

  return (
    <section className="footer">
      <div className="logo">
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className="rights">
        {t("actions.developedBy") + " "}
        <a href="https://t.me/abula4ever" target="_blank" rel="noreferrer">
          Abula
        </a>
      </div>

      <div className="socials">
        <a
          href="https://instagram.com/the_abdulazyz?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noreferrer"
        >
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>

        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;

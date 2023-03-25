import React from "react";

import "../../styles/Home.css";

import BG from "../../images/computer.png";
import { useTranslation } from "react-i18next";
const Poster = () => {
  const { t } = useTranslation();

  return (
    <section className={"home"}>
      <div className={"poster-title"}>BIG SALE 20%</div>
      <div className={"poster-product"}>
        <div className={"poster-text"}>
          <div className={"poster-subtitle"}>
            the bestseller of {new Date().getFullYear()}
          </div>
          <h1 className={"poster-head"}>LENNON r2d2 with NVIDIA 6090 TI</h1>
          <button className={"poster-button"}>{t("actions.buyNow")}</button>
        </div>
        <div className={"poster-image"}>
          <img src={BG} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Poster;

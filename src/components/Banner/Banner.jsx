import React from "react";

import "../../styles/Home.css";

import bannerImg from "../../images/banner.png";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <section className={"banner"}>
      <div className={"left"}>
        <p className={"content"}>
          NEW YEAR
          <span>SALE</span>
        </p>
        <button className={"more"}>{t("actions.seeMore")}</button>
      </div>

      <div className={"right"} style={{ backgroundImage: `url(${bannerImg})` }}>
        <p className={"discount"}>
          save up to <span>50%</span> off
        </p>
      </div>
    </section>
  );
};

export default Banner;

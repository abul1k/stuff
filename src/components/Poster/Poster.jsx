import React from "react";

import"../../styles/Home.css";

import BG from "../../images/computer.png";

const Poster = () => (
  <section className={"home"}>
    <div className={"poster-title"}>BIG SALE 20%</div>
    <div className={"poster-product"}>
      <div className={"poster-text"}>
        <div className={"poster-subtitle"}>the bestseller of 2022</div>
        <h1 className={"poster-head"}>LENNON r2d2 with NVIDIA 6090 TI</h1>
        <button className={"poster-button"}>Shop Now</button>
      </div>
      <div className={"poster-image"}>
        <img src={BG} alt="" />
      </div>
    </div>
  </section>
);

export default Poster;

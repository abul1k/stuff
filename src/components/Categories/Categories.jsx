import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "../../styles/Categories.css";

const Categories = ({ title, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  const { t } = useTranslation();

  const translater = (categoryName) => {
    const name = categoryName
    .replaceAll("Clothes", t("categories.clothes"))
    .replaceAll("Electronics", t("categories.electronics"))
    .replaceAll("Furniture", t("categories.furniture"))
    .replaceAll("Shoes", t("categories.shoes"))
    .replaceAll("Others", t("categories.others"))
    return name;
  };

  return (
    <section className="section">
      <h2>{title}</h2>

      <div className="categories-list">
        {list.map(({ id, name, image }) => (
          <Link to={`/categories/${id}`} key={id} className="categories-item">
            <div
              className="categories-image"
              style={{ backgroundImage: `url(${image})` }}
            />
            <h3 className="categories-title">{translater(name)}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;

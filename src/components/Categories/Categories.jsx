import React from "react";
import { Link } from "react-router-dom";

import "../../styles/Categories.css";

const Categories = ({ title, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

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
            <h3 className="categories-title">{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;

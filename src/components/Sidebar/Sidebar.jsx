import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "../../styles/Sidebar.css";

const Sidebar = () => {
  const { t } = useTranslation();

  const { list } = useSelector(({ categories }) => categories);

  const translater = (categoryName) => {
    const name = categoryName
      .replaceAll("Clothes", t("categories.clothes"))
      .replaceAll("Electronics", t("categories.electronics"))
      .replaceAll("Furniture", t("categories.furniture"))
      .replaceAll("Shoes", t("categories.shoes"))
      .replaceAll("Others", t("categories.others"));
    return name;
  };

  return (
    <section className={"sidebar"}>
      <h2 className={"sidebar-title"}>{t("sidebar.categories")}</h2>
      <nav>
        <ul className={"sidebar-menu"}>
          {list.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) =>
                  `${"sidebar-link"} ${isActive ? "sidebar-active" : ""}`
                }
                to={`/categories/${id}`}
              >
                {translater(name)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={"sidebar-footer"}>
        <a href="/help" target="_blank" className={"sidebar-link"}>
          {t("sidebar.help")}
        </a>
        <a
          href="/terms"
          target="_blank"
          className={"sidebar-link"}
          style={{ textDecoration: "underline" }}
        >
          {t("sidebar.terms")}
        </a>
      </div>
    </section>
  );
};

export default Sidebar;

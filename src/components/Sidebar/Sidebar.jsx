import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "../../styles/Sidebar.css";

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);

  return (
    <section className={"sidebar"}>
      <h2 className={"sidebar-title"}>CATEGORIES</h2>
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
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={"sidebar-footer"}>
        <a href="/help" target="_blank" className={"sidebar-link"}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          className={"sidebar-link"}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;

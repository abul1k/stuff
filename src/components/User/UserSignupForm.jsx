import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";

import "../../styles/User.css";

const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [entered, setEntered] = useState({
    email: false,
    password: false,
  });

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (values.email && values.password && values.password.length >= 6) {
      setConfirmed(true);
    }
  }, [values]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
    setEntered({ ...entered, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmed) {
      dispatch(createUser(values));
      closeForm();
    }
  };

  return (
    <div className={"user-wrapper"}>
      <div className={"user-close"} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={"user-title"}>{t("userForm.signUp")}</div>

      <form className={"user-form"} onSubmit={handleSubmit}>
        <div className={"user-group"}>
          <input
            className={
              values.email || !entered.email ? "user-input" : "user-required"
            }
            type="email"
            placeholder={t("userForm.email")}
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            onBlur={(e) => setEntered({ ...entered, [e.target.name]: true })}
            required
          />
        </div>

        <div className={"user-group"}>
          <input
            className={
              values.password || !entered.password
                ? "user-input"
                : "user-required"
            }
            type="password"
            placeholder={t("userForm.password")}
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            onBlur={(e) => setEntered({ ...entered, [e.target.name]: true })}
            required
          />

          {entered.password && (
            <span className={"user-requiredText"}>
              {values.password.length < 6 &&
                t("userForm.requiredLength") +
                  " " +
                  `(${values.password.length})`}
            </span>
          )}
        </div>

        <div
          className={"user-link"}
          onClick={() => toggleCurrentFormType("login")}
        >
          {t("userForm.iHaveAnAccount")}
        </div>

        <button type="submit" className={"user-submit"}>
          {t("userForm.createAnAccount")}
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;

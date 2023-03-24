import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";

import "../../styles/User.css";

const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();

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
      dispatch(loginUser(values));
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

      <div className={"user-title"}>Log In</div>

      <form className={"user-form"} onSubmit={handleSubmit}>
        <div className={"user-group"}>
          <input
            className={
              values.email || !entered.email ? "user-input" : "user-required"
            }
            type="email"
            placeholder="Your email"
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
            placeholder="Your password"
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
                `Password must be at least 6 characters. (${values.password.length})`}
            </span>
          )}
        </div>

        <div
          onClick={() => toggleCurrentFormType("signup")}
          className={"user-link"}
        >
          Create an account
        </div>

        <button type="submit" className={"user-submit"}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;

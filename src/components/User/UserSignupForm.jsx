import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";

import { toast } from "react-toastify";

import styles from "../../styles/User.module.css";

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
      dispatch(createUser(values));
      closeForm();
      toast.success("You have successfully registered");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            className={
              values.email || !entered.email ? styles.input : styles.required
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

        <div className={styles.group}>
          <input
            className={
              values.password || !entered.password
                ? styles.input
                : styles.required
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
            <span className={styles.requiredText}>
              {values.password.length < 6 &&
                `Password must be at least 6 characters. (${values.password.length})`}
            </span>
          )}
        </div>

        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("login")}
        >
          I already have an account
        </div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;

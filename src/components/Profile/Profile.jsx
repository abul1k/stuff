import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateUser, logOut } from "../../features/user/userSlice";

import "../../styles/Profile.css";

const Profile = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    // email: "",
    password: "",
    // avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
    window.location.reload();
  };

  return (
    <section className={"profile"}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <form className={"profile-form"} onSubmit={handleSubmit}>
          <div className={"profile-group"}>
            <input
              type="email"
              placeholder={t('userForm.email')}
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className={"profile-group"}>
            <input
              type="name"
              placeholder="Your name"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div> */}

          <div className={"profile-group"}>
            <input
              type="password"
              placeholder={t('userForm.password')}
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className={"profile-group"}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div> */}

          <div className={"profile-actions"}>
            <button type="submit" className={"profile-update"}>
            {t('actions.update')}
            </button>
            <button onClick={handleLogOut} className={"profile-logout"}>
            {t('actions.logOut')}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Profile;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const UserImpl = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      toast.success("You have successfully registered");

      localStorage.setItem("user", JSON.stringify(UserImpl.user));
      return UserImpl.user;
    } catch (error) {
      toast.error(error.code);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const UserImpl = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      toast.success("You have successfully registered");

      localStorage.setItem("user", JSON.stringify(UserImpl.user));
      return UserImpl.user;
    } catch (error) {
      toast.error(error.code);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const addCurrentUser = (state, { payload }) => {
  state.currentUser = {
    email: payload.email,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    cart: [],
    favourite: [],
    formType: "signup",
    showForm: false,
  },
  reducers: {
    addItemToFavourite: (state, { payload }) => {
      let newFavourite = [...state.favourite];
      newFavourite.push(payload);
      state.favourite = newFavourite;
    },

    removeItemFromFavourite: (state, { payload }) => {
      state.favourite = state.favourite.filter(({ id }) => id !== payload);
    },

    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });

      state.cart = newCart;
    },

    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },

    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },

    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },

    logOut: (state) => {
      localStorage.removeItem("user");
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
  },
});

export const {
  addItemToFavourite,
  removeItemFromFavourite,
  addItemToCart,
  removeItemFromCart,
  toggleForm,
  toggleFormType,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;

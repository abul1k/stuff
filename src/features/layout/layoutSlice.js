import { createSlice } from "@reduxjs/toolkit";

// checking devise theme
const system = window.matchMedia("(prefers-color-scheme: dark");

let systemTheme;

if (system.matches) {
  systemTheme = "dark";
} else {
  systemTheme = "light";
}

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: {
    theme: localStorage.getItem("theme") || systemTheme,
  },
  reducers: {
    // change skin of template
    toggleTheme: (state, { payload }) => {
      state.theme = payload;
      localStorage.setItem("theme", payload);
    },
  },
});

export const { toggleTheme } = layoutSlice.actions;
export default layoutSlice.reducer;

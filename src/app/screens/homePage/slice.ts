// STEP 1: Define initial state [empty array]:

import { createSlice } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../libs/data/types/pages";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

// STEP 2: create slice with reducers:
const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    // Each reducer updates 1 piece of state
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

// STEP 3: Export actions (to dispatch from components)
export const { setNewDishes, setPopularDishes, setTopUsers } =
  homePageSlice.actions;

// STEP 4: Export reducer (to add to store)
const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;

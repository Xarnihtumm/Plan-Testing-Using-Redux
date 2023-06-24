import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8383/api/speed/all";
const GET_SPEED_BY_ID = "http://localhost:8383/api/speed/id";
const ADD_NEW_SPEED = "http://localhost:8383/api/speed/create/plan/";
const UPDATE_SPEED = "http://localhost:8383/api/speed/update";

const initialState = {
  speeds: [],
  status: "idle",
  error: null,
};

export const fetchSpeeds = createAsyncThunk("speeds/fetchSpeeds", async () => {
  const response = await axios.get(BASE_URL);
  console.log(response.data);
  return response.data;
});

export const addNewSpeeds = createAsyncThunk(
  "speeds/addNewSpeeds",
  async (initialspeed, { getState }) => {
    const { plans } = getState().plans;
    const planId = plans.length > 0 ? plans[plans.length - 1].id : null;
    if (!planId) {
      throw new Error("No plans available. Please create a plan first.");
    }
    const response = await axios.post(`${ADD_NEW_SPEED}${planId}`, initialspeed);
    console.log(response.data);
    return response.data;
  }
);

export const updateSpeeds = createAsyncThunk(
  "speeds/updateSpeeds",
  async (initialSpeed, { getState }) => {
    const { planId } = initialSpeed;
    if (!planId) {
      throw new Error("No plans available. Please create a plan first.");
    }
    const response = await axios.post(`${ADD_NEW_SPEED}${planId}`, initialSpeed.speeds);
    console.log(response.data);
    return response.data;
  }
);

export const fetchSpeedById = createAsyncThunk(
  "speeds/fetchSpeedById",
  async (initialSpeed) => {
    console.log("YOU Reach this" + initialSpeed);
    const response = await axios.get(`${GET_SPEED_BY_ID}/${initialSpeed}`);
    return response.data;
  }
);

export const speedSlice = createSlice({
  name: "speeds",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSpeeds.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSpeeds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.speeds = action.payload;
      })
      .addCase(fetchSpeeds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewSpeeds.fulfilled, (state, action) => {
        state.speeds.push(action.payload);
      })
      .addCase(updateSpeeds.fulfilled, (state, action) => {
        const updatedSpeeds = state.speeds.map((speed) => {
          if (speed.id === action.payload.id) {
            return action.payload;
          }
          return speed;
        });
        state.speeds = updatedSpeeds;
      })
      .addCase(fetchSpeedById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.speeds = action.payload;
      });
  },
});

export const selectAllSpeeds = (state) => state.speeds.speeds;
export const selectSpeedsById = (state, speedId) => state.speeds.speeds.find((speed) => speed.id === speedId);
export const getSpeedsError = (state) => state.speeds.error;
export const selectSpeedById = (state, speedId) => state.speeds.speeds
export const getSpeedsStatus = (state) => state.speeds.status;

export default speedSlice.reducer;

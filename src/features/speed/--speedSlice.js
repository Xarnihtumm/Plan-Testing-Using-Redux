import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8383/api/speed/all";
const GET_SPEED_BY_ID = "http://localhost:8383/api/speed/id";
//const ADD_NEW_SPEED = "http://localhost:8383/api/speed/create/plan/";
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
  console.log("hafashfsdfdsfhdshf ar ni")
  return response.data;
});

// export const addNewSpeeds = createAsyncThunk(
//   "speeds/addNewSpeeds",
//   async (initialspeed) => {
//     console.log(initialspeed);
//     const { 0: { planId } } = initialspeed;
//     //const planId ={ initialspeed };
//     console.log(planId)
//     const response = await axios.post(`${ADD_NEW_SPEED}${planId}`,initialspeed);
//     console.log(response.data);
//     return response.data;
//   }
// );

// export const updateSpeeds = createAsyncThunk(
//   "speeds/updateSpeeds",
//   async (initialSpeed) => {
//     console.log(initialSpeed);
//     const { 0: { planId } } = initialSpeed;
//     const response = await axios.post(`${ADD_NEW_SPEED}${planId}`, initialSpeed.speeds);
//     console.log(response.data);
//     return response.data;
//   }
// );  Coded by zar ni



// export const addNewSpeeds = createAsyncThunk(
//   "speeds/addNewSpeeds",
//   async (initialSpeed, { getState }) => {
//     console.log(getState)
//      const { plans } = getState().plans; // Get the plans from the state
//      const { planId } = plans[0]; // Get the planId from the first plan in the array
//      console.log(plans)
//      console.log(planId)
//     const { 0: { Id } } = plans;
//     const response = await axios.post(`${ADD_NEW_SPEED}${Id}`, initialSpeed);
//     console.log(response.data);
//     return response.data;
//   }
// );  Coded By chat GPT

export const addNewSpeeds = createAsyncThunk(
  "speeds/addNewSpeeds",
  async (initialspeed, { getState }) => {
    const { plans } = getState().plans; // Get the plans from the state
    const planId = plans.length > 0 ? plans[plans.length-1].id : null; // Get the planId from the first plan in the array if it exists
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
    console.log(initialSpeed)
   // const { plans } = getState().plans; // Get the plans from the state
    //const  planId  = plans.length > 0 ? plans[plans.length-1].id : null; // Get the planId from the first plan in the array
    const  { planId }  = initialSpeed;
console.log(planId)
    if (!planId) {
      throw new Error("No plans available. Please create a plan first.");
    }
    const response = await axios.post(`${ADD_NEW_SPEED}${planId}`, initialSpeed.speeds);
    console.log(response.data);
    return response.data;
  }
);


// export const addNewSpeeds = createAsyncThunk(
//   "speeds/addNewSpeeds",
//   async ({ planId, ...initialspeed }) => {
//     console.log(initialspeed);
//     const { 0: { planId } } = initialspeed;
//     console.log(planId);
//     const response = await axios.post(`${ADD_NEW_SPEED}${planId}`, initialspeed);
//     console.log(response.data);
//     return response.data;
//   }
// );




export const fetchSpeedById = createAsyncThunk(
  "speeds/fetchSpeedById",
  async (initialSpeed) => {
    console.log("YOU Reach this" + initialSpeed);
    // const { id } = initialSpeed;
    
    const response = await axios.get(`${GET_SPEED_BY_ID}/${initialSpeed}`);
    //console.log(response.data);
    return response.data
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
        console.log("You fetch speeds")
      })
      .addCase(fetchSpeeds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(addNewSpeeds.fulfilled,(state,action) =>{
      //   state.speeds = action.payload;
      // })
      // .addCase(updateSpeeds.fulfilled,(state,action) =>{
      //   state.speeds = action.payload;
      //   console.log("YOu update update speed")
      // })Coded by zar ni

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
        console.log("You Click fetchSpeedById")
        
      });
  },
});

// export const selectAllSpeeds = (state) => state.speeds.speeds;
// // export const selectSpeedsById = (state, speedId) =>
// //   state.speeds.speeds.find((speed) => speed.id === speedId);

// export const getSpeedsError = (state) => state.speeds.error;
// export const getSpeedsStatus = (state) => state.speeds.status;

// export default speedSlice.reducer; Zar Ni Code 


export const selectAllSpeeds = (state) => state.speeds.speeds;
//export const selectSpeedsById = (state, speedId) => state.speed.speeds.find((speed) => speed.id === speedId);
//export const selectSpeedsById = (state, speedId) => state.speeds.speeds.find((speed) => speed.id === speedId);
export const selectSpeedsById = (state, speedId) => state.speeds.speeds
export const getSpeedsError = (state) => state.speeds.error;
export const getSpeedsStatus = (state) => state.speeds.status;

export default speedSlice.reducer;

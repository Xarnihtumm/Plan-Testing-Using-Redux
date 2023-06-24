import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8383/api/plans/all";
const DELETE_PLAN_BY_ID = "http://localhost:8383/api/plans/id";
const ADD_NEW_PLANS = "http://localhost:8383/api/plans/create";
const UPDATE_PLANS = "http://localhost:8383/api/plans/update";
const initialState = {
  plans: [],
  status: "idle",
  error: null,
};

export const fetchPlans = createAsyncThunk("plans/fetchPlans", async () => {
  const response = await axios.get(BASE_URL);
  console.log(response.data);
  return response.data;
});

export const addNewPlans = createAsyncThunk(
  "plans/addNewPlans",
  async (initialPlan) => {
    const response = await axios.post(ADD_NEW_PLANS, initialPlan);
    console.log(response.data);
    return response.data;
  }
);

export const updatePlans = createAsyncThunk(
  "plans/updatePlans",
  async (initialPlan) => {
    const response = await axios.post(UPDATE_PLANS, initialPlan.plans);
    console.log(response.data);
    return response.data;
  }
); //Coded by zar ni

// export const updatePlans = createAsyncThunk(
//   "plans/updatePlans",
//   async (initialPlan, { getState }) => {
//     console.log(getState().speeds)
//     const { speeds } = getState().speeds; // Get the speeds from the state
//     const updatedPlan = {
//       ...initialPlan,
//       speeds: speeds.map((speed) => speed.id), // Update speeds with only the speed ids
//     };
//     const response = await axios.post(UPDATE_PLANS, updatedPlan);
//     console.log(response.data);
//     return response.data;
//   }
// );code by chat GPT



export const deletePlan = createAsyncThunk(
  "plans/deletePlan",
  async (initialPlan) => {
    console.log("deleteplan:" + initialPlan);
    await axios.delete(`${DELETE_PLAN_BY_ID}/${initialPlan}`);
    const response = await axios.get(BASE_URL);
    return response.data;

    // await axios.delete(`${DELETE_PLAN_BY_ID }${initialPlan.id}`)
    // const response = await axios.get(BASE_URL)
    // return response.data
    // const {id} = initialPlan;
    // try {
    //     await axios.delete(`${DELETE_PLAN_BY_ID}/${initialPlan}`);
    //     const response = await axios.get(BASE_URL)
    //     console.log(initialPlan)

    //     if (response?.status === 200) return initialPlan;
    //     return `${response.status} : ${response.statusText}`;
    // } catch (error) {
    //     console.log(id)
    //     return error.message
    // }
  }
);

export const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder

      .addCase(fetchPlans.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        //     if (!action?.payload.id) {
        //         console.log("could not delete");
        //         console.log(action.payload)
        //         return
        //     }

        //     const { id } = action.payload;
        //     const OldPlans = state.posts.filter(plan =>
        //         plan.id !== id)
        //     state.plans = OldPlans
        // })
        // if(!action.payload?.id){
        //     console.log('Could not complete delete!')
        //     console.log("What is this   "+   action.payload)
        //     return;
        //  }

        //  const plans = state.plans.filter(plan => plan.id !== action.payload.id)
        state.plans = action.payload;
      })

      .addCase(addNewPlans.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })

      // .addCase(updatePlans.fulfilled, (state, action) => {
      //   state.status='succeeded';
      //   //state.plans = action.payload
      //    const plan = action.payload;

      //    const plans = state.plans.filter((p) => p.id !== plan.id);

      //    state.plans = [plan, ...plans];
      // }); coded by zar ni

      .addCase(updatePlans.fulfilled, (state, action) => {
        const updatedPlans = state.plans.map((plan) => {
          if (plan.id === action.payload.id) {
            return action.payload;
          }
          return plan;
        });
        state.plans = updatedPlans;
      })
      
  },
});

export const selectAllPlans = (state) => state.plans.plans;
export const selectPlanById = (state, planId) =>
  state.plans.plans.find((plan) => plan.id === planId);

export const getPlansError = (state) => state.plans.error;
export const getPlansStatus = (state) => state.plans.status;

export default planSlice.reducer;

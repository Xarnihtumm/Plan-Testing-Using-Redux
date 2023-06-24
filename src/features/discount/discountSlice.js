import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8383/api/discount/all";
const GET_DISCOUNT_BY_ID = "http://localhost:8383/api/discount/id";
const ADD_NEW_DISCOUNT = "http://localhost:8383/api/discount/create/speed/";
// const UPDATE_DISCOUNT = "http://localhost:8383/api/speed/update";

const initialState = {
  discounts: [],
  status: "idle",
  error: null,
};

export const fetchDiscounts = createAsyncThunk("discounts/fetchDiscounts", async () => {
  const response = await axios.get(BASE_URL);
  // console.log(response.data);
  return response.data;
});


export const addNewDiscount = createAsyncThunk(
  "discounts/addNewDiscount",
  async ({ speedId, discount }) => {


    console.log(speedId);
    console.log(discount)
    const response = await axios.post(`${ADD_NEW_DISCOUNT}${speedId}`, discount);
    return response.data;
  }
);

export const fetchDiscountById = createAsyncThunk(
  "speeds/fetchSpeedById",
  async (initialDiscount) => {
    console.log("Your Discount : " + initialDiscount);
   
    const response = await axios.get(`${GET_DISCOUNT_BY_ID}/${initialDiscount}`);
    return response.data;
  }
);
export const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(fetchDiscounts.pending, (state, action) => {
        state.status = "loading";
        
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.discounts = action.payload;
        console.log("haha")
      })
      .addCase(addNewDiscount.fulfilled, (state, action) => {
        const { speedId, discount } = action.payload;
        const speed = state.discounts.find((speed) => speed.id === speedId);
  
        if (speed) {
          speed.discounts.push(discount);
        }
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDiscountById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.discounts = action.payload;
        
      });
      
  },
});

export const selectAllDiscounts = (state) => state.discounts.discounts;
// export const selectDiscountById = (state, discountId) =>
//   state.discounts.discounts.find((discount) => discount.id === discountId);
// export const selectDiscountById  = (state, discountId ) => state.discounts.discounts.find((discount) => discount.id === discountId);
export const selectDiscountById = (state) => state.discounts.discounts
// export const selectDiscountById = (state, discountId) =>
//   state.discounts.find(discount => discount.id === discountId) || null;
// export const selectDiscountById = (state, discountId) => {
//   const discounts = Array.isArray(state.discounts) ? state.discounts : [];
//   return discounts.find(discount => discount.id === discountId) || null;
// };

export const getDiscountError = (state) => state.discounts.error;
export const getDiscountStatus = (state) => state.discounts.status;

export default discountSlice.reducer;

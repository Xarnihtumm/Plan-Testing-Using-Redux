import { configureStore } from "@reduxjs/toolkit";
import  planReducer  from "../features/plans/planSlice"
import speedReducer from "../features/speed/speedSlice"
import discountReducer from "../features/discount/discountSlice"



 export const store= configureStore ({
    reducer : {
        plans:planReducer,
        speeds:speedReducer,
        discounts:discountReducer
    }});
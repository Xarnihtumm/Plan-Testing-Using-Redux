import React, { useEffect } from "react";
import "./Discount.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscounts, selectAllDiscounts } from "./discountSlice";
import { fetchSpeeds,selectSpeedsById ,fetchSpeedById} from "../speed/speedSlice";

const Discount = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const {speedId,mb} = location.state;
    
//     useEffect(() => {
//         dispatch(fetchSpeeds(speedId));
//       }, [dispatch, speedId]);
// //const discounts = useSelector(selectAllDiscounts);
// const getspeed = useSelector((state) => selectSpeedsById(state));
// console.log(getspeed) coded by zar ni

//const navigate = useNavigate();
   
    // const getspeed = useSelector((state) => selectSpeedsById(state, speedId));
    // console.log(getspeed);
   
    useEffect(() => {
      dispatch(fetchSpeeds());
    }, [dispatch, speedId]);
    console.log(speedId)

    const getspeed = useSelector((state) => selectSpeedsById(state, speedId));
    console.log(getspeed)

  return (
    <div className="card">
      <h3 className="card-title">Speed: {mb} MB</h3>
      <div className="discount-list">
         {getspeed.discount.map((discount) => (
          <div className="discount-item" key={discount.id}>
              <h3>For {discount.months} Months</h3>
              <p>Discount Prices: {discount.prices}Kyats</p>
            <p>{discount.discountName}</p>
            <p>Discount Amount: {discount.discountAmount}</p>
          
           
            
          </div>
        ))} 
      </div>
    </div>
  );
};

export default Discount;


// const SpeedDetails = ({ speedId, planId }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const getspeed = useSelector((state) => selectSpeedsById(state, speedId));
//     console.log("line 30");
//     const speedMb= getspeed.mb
//     console.log(getspeed.mb); //LIne 29
//     console.log("Line 34 Plan");
//     console.log(planId);
  
//     useEffect(() => {
//       dispatch(fetchSpeedById(speedId));
//     }, [dispatch, speedId]);
  
    // const gotoPayment = (discount,speedId) => {
    //   console.log(discount)
    //   navigate(`/payment/${discount.id}/${speedId}/${planId}`)
  
    // }
  
//     return (
//       <>
//         {getspeed && (
//           <>
//             <div class="speed_div">
//               <h2 class="speed_title">Choosen Speed: {getspeed.mb} MB</h2>
//             </div>
//             {Array.isArray(getspeed.discount) &&
//               getspeed.discount.map((discount) => (
//                 // <div class="discount_card" key={discount.id} onClick={() => gotoPayment(discount,getspeed.id)}>
//                 <div class="discount_card" key={discount.id}>
//                   <h2 class="card-title"> {discount.discountName}</h2>
//                   <br />
//                   <p class="card-description">Months - {discount.months}</p>
//                   <p class="card-description">Prices - {discount.prices}</p>
//                   <p class="card-description">
//                     Discount - {discount.discountAmount}
//                   </p>
//                   <p class="card-description">Speed Id - {speedId}</p>
//                   <p class="card-description">Plan Id - {planId}</p>
//                   <p class="card-description">Discount Id - {discount.id}</p>
  
//                   {/* <Link
//                     to="/payment"
//                     state={{ speedMb, planId, discount: discount.id }}
//                   >
//                     Buy
//                   </Link> */}
//                   <Link
//                     to="/profile"
//                     state={{ speedMb, planId, discount : discount.id }}
//                   >
//                     Buy
//                   </Link>
//                 </div>
//               ))}
//           </>
//         )}
//       </>
//     );
//   };
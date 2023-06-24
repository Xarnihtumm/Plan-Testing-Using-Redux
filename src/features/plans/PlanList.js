// import React from "react";
// import { useEffect } from "react";
// import { useSelector,useDispatch} from "react-redux";
// import { Radio } from 'react-loader-spinner'
// import { selectAllPlans, getPlansError, getPlansStatus, fetchPlans } from "./planSlice";
// import TableData from "./TableData";

// function PlanList() {
//   const dispatch = useDispatch();
//   const plans = useSelector(selectAllPlans);
//   console.log("Palns:" + plans[0]);
//   const status = useSelector(getPlansStatus);
//   console.log(status);
//   const error = useSelector(getPlansError);

//   console.log(error)

//   useEffect(() => {
//     if(status === 'idle'){
//         dispatch(fetchPlans())
//     }
//     },[status,dispatch])

//   let content;

//   if (status === "loading") {
//     // content = <div className="text-center my-5">Loading...</div>;
//     content =<Radio
//     visible={true}
//     height="80"
//     width="80"
//     ariaLabel="radio-loading"
//     wrapperStyle={{}}
//     wrapperClass="radio-wrapper"
//   />
//   } else if (status === "succeeded") {
//     // change the order of the posts
//     // const orderedPlans = plans.slice().sort((a, b) => a - b);//Original copy

//     // content = orderedPlans.map((plan, i) => <TableData key={i} plan={plan} />);  Original Copy

//     content = plans.map((plan) => <TableData  plans={plan} />);

//   } else if (status === "failed") {
//     content = (
//       <>
//         <h1>Posts not found</h1>
//         <p className="text-center text-danger">{error}</p>
//       </>
//     );
//   }

//   return (
//     <section className="section">
//       <div className="container">
//         <div className="row">
//           <div className="col-12 text-center">
//             <h3>Here are all the posts</h3>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12">{content}</div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default PlanList;

import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Radio } from "react-loader-spinner";
import {
  selectAllPlans,
  getPlansStatus,
  getPlansError,
  fetchPlans,
} from "./planSlice";
import TableData from "./TableData";
import { fetchSpeeds, getSpeedsStatus} from "../speed/speedSlice";
function PlanList() {
  const dispatch = useDispatch();
  const plans = useSelector(selectAllPlans);
  const status = useSelector(getPlansStatus);
  const error = useSelector(getPlansError);
  //const speedStatus = useSelector(getSpeedsStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlans());
      dispatch(fetchSpeeds())
      
    }
    // if (speedStatus === "idle") {
      
    //   dispatch(fetchSpeeds())
    // }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = (
      <div className="text-center my-5">
        <Radio
          visible={true}
          height={100}
          width={100}
          ariaLabel="radio-loading"
          wrapperClass="radio-wrapper"
        />
      </div>
    );
  } else if (status === "succeeded") {
    
    // content =<TableData  plans = {plans}/>

    content = plans.map((plan, i) => (
      <TableData key={i} plan={plan} />
  ))
  //  content = plans.map((plan) => (
  //     <TableData
  //       id={plan.id}
  //       planName={plan.planName}
  //       speed={plan.speed}
  //       prices={plan.prices}
  //     />
  //   ));
  } else if (status === "failed") {
    content = (
      <>
        <h1>Posts not found</h1>
        <p className="text-center text-danger">{error}</p>
      </>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3>Here are all the plans</h3>
            <Link to="/">
              <button>Create Plan</button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">{content}</div>
        </div>
      </div>
    </section>
  );
}

export default PlanList;

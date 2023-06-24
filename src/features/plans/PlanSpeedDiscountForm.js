// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "./PlanSpeedDiscountForm.css";
// import { addNewPlans } from "./planSlice";
// import { addNewSpeeds } from "../speed/speedSlice";

// const PlanSpeedDiscountForm = () => {
//   const [planName, setPlanName] = useState("");
//   const [speeds, setSpeeds] = useState([{ mb: "" }]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       dispatch(addNewPlans({ planName })).unwrap();
//       console.log("haha"+ planName.id)
//       dispatch(addNewSpeeds(speeds),planName.id).unwrap();
//       setPlanName("");
//       setSpeeds([{ mb: "" }]);
//       navigate("/");
//     } catch (error) {
//       console.error("Failed to save the form", error);
//     }
//   };

//   const addSpeed = () => {
//     setSpeeds([...speeds, { mb: "" }]);
//   };

//   const removeSpeed = (index) => {
//     const updatedSpeeds = [...speeds];
//     updatedSpeeds.splice(index, 1);
//     setSpeeds(updatedSpeeds);
//   };

//   return (
//     <div className="plan-form-container">
//       <h1>Plan Speed Discount Form</h1>
//       <form onSubmit={handleSubmit} className="plan-form">
//         {/* Plan Input */}
//         <div className="form-group">
//           <label className="form-label">Plan</label>
//           <input
//             type="text"
//             className="form-input"
//             value={planName}
//             onChange={(e) => setPlanName(e.target.value)}
//           />
//         </div>

//         {/* Speed Inputs */}
//         <div className="form-group">
//           <label className="form-label">Speeds</label>
//           {speeds.map((speed, index) => (
//             <div key={index} className="speed-input-container">
//               <input
//                 type="text"
//                 className="form-input"
//                 value={speed.mb}
//                 onChange={(e) => {
//                   const updatedSpeeds = [...speeds];
//                   updatedSpeeds[index].mb = e.target.value;
//                   setSpeeds(updatedSpeeds);
//                 }}
//               />
//               <button
//                 type="button"
//                 className="remove-button"
//                 onClick={() => removeSpeed(index)}
//               >
//                 Remove Speed
//               </button>
//             </div>
//           ))}
//           <button type="button" className="add-button" onClick={addSpeed}>
//             Add Speed
//           </button>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PlanSpeedDiscountForm;  Coded By Zar Ni Tun

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./PlanSpeedDiscountForm.css";
import { addNewPlans } from "./planSlice";
import { addNewSpeeds } from "../speed/speedSlice";

const PlanSpeedDiscountForm = () => {
  // const [planName, setPlanName] = useState("");
  // const [speeds, setSpeeds] = useState([{ mb: "" }]);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const createdPlan = await dispatch(addNewPlans({ planName })).unwrap();
  //     const planId = createdPlan.id;
  //     console.log(planId)

  //     const speedsWithPlanId = speeds.map((speed) => ({
  //       ...speed,
  //       planId: planId,
  //     }));

  //     //await dispatch(addNewSpeeds(speedsWithPlanId),planId).unwrap();
  //      await dispatch(addNewSpeeds({ planId: planId, mb:speedsWithPlanId})).unwrap();


  //     setPlanName("");
  //     setSpeeds([{ mb: "" }]);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Failed to save the form", error);
  //   }
  // };

  // const addSpeed = () => {
  //   setSpeeds([...speeds, { mb: "" }]);
  // };

  // const removeSpeed = (index) => {
  //   const updatedSpeeds = [...speeds];
  //   updatedSpeeds.splice(index, 1);
  //   setSpeeds(updatedSpeeds);
  // };  correct code by xar ni

  const [planName, setPlanName] = useState("");
  const [speeds, setSpeeds] = useState([{ mb: "" }]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new plan and retrieve the created plan ID
      const createdPlan = await dispatch(addNewPlans({ planName })).unwrap();
      const planId = createdPlan.id;

      // Map speeds with the plan ID
      const speedsWithPlanId = speeds.map((speed) => ({
        ...speed,
        planId: planId,
      }));

      // Add new speeds with the plan ID
      await dispatch(addNewSpeeds(speedsWithPlanId)).unwrap();

      setPlanName("");
      setSpeeds([{ mb: "" }]);
      navigate("/list");
    } catch (error) {
      console.error("Failed to save the form", error);
    }
  };

  const addSpeed = () => {

    
    setSpeeds([...speeds, { mb: "" }]);
  };

  const removeSpeed = (index) => {
    const updatedSpeeds = [...speeds];
    updatedSpeeds.splice(index, 1);
    setSpeeds(updatedSpeeds);
  };

  return (
    <div className="plan-form-container">
      <h1>Plan Speed Discount Form</h1>

      <Link to="/list">View Your Plans</Link>
      <form onSubmit={handleSubmit} className="plan-form">
        {/* Plan Input */}
        <div className="form-group">
          <label className="form-label">Plan</label>
          <input
            type="text"
            className="form-input"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>

        {/* Speed Inputs */}
        <div className="form-group">
          <label className="form-label">Speeds</label>
          {speeds.map((speed, index) => (
            <div key={index} className="speed-input-container">
              <input
                type="text"
                className="form-input"
                value={speed.mb}
                onChange={(e) => {
                  const updatedSpeeds = [...speeds];
                  updatedSpeeds[index].mb = e.target.value;
                  setSpeeds(updatedSpeeds);
                }}
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => removeSpeed(index)}
              >
                Remove Speed
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addSpeed}>
            Add Speed
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PlanSpeedDiscountForm;




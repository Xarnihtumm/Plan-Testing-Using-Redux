// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchPlans, selectPlanById, updatePlans } from "./planSlice";
// import { updateSpeeds } from "../speed/speedSlice";
// import "./UpdatePlanForm.modal.css";

// const UpdatePlanForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchPlans());
//   }, [dispatch]);

//   const { planId } = useParams();

//   const plan = useSelector((state) => selectPlanById(state, Number(planId)));
//   console.log(plan);
//   console.log(planId);
//   //console.log(plan);

//   const [addRequestStatus, setAddRequestStatus] = useState("idle");

//   const [id, setId] = useState(plan?.id);
//   const [speeds, setSpeeds] = useState([{ mb: "" }]);
//   const [planName, setPlanName] = useState(plan?.planName);
//   const canSave = [id, planName].every(Boolean) && addRequestStatus === "idle";
//   const onUpdate = async (event) => {
//     event.preventDefault();
//     if (canSave) {
//       try {
//         setAddRequestStatus("pending");

//         const updatedPlan = await dispatch(
//           updatePlans({
//             plans: {
//               id,
//               planName,
//             },
//           })
//         ).unwrap();
//         const planId = updatedPlan.id;
//         const speedsWithPlanId = speeds.map((speed) => ({
//           ...speed,
//           planId: planId,
//         }));

//         // Add new speeds with the plan ID
//         await dispatch(updateSpeeds(speedsWithPlanId)).unwrap();
//         setPlanName("");
//         setSpeeds([{ mb: "" }]);
//         navigate("/");
//       } catch (error) {
//         console.error("failed to save the post", error);
//       } finally {
//         setAddRequestStatus("idle");
//       }
//     }

//     setPlanName("");
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
//     <div className="plan-form">
//       <h2>Update New Plan</h2>
//       <form onSubmit={onUpdate}>
//         <div className="form-group">
//           <label htmlFor="planName">Plan Name</label>
//           <input
//             type="text"
//             id="planName"
//             value={planName}
//             onChange={(e) => setPlanName(e.target.value)}
//             required
//           />
//         </div>
//         {plan.speed.map((speed, index) => (
//           <div key={index} className="speed-input-container">
//             <input
//               type="text"
//               className="form-input"
//               value={speed.mb}
//               onChange={(e) => {
//                 const updatedSpeeds = [...speeds];
//                 updatedSpeeds[index].mb = e.target.value;
//                 setSpeeds(updatedSpeeds);
//               }}
//             />
//             <button
//               type="button"
//               className="remove-button"
//               onClick={() => removeSpeed(index)}
//             >
//               Remove Speed
//             </button>
//           </div>
//         ))}
//         <button type="button" className="add-button" onClick={addSpeed}>
//           Add Speed
//         </button>

//         <div className="form-group">
//           <button type="submit" disabled={!canSave}>
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdatePlanForm;  Coded by zar ni 


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   fetchPlans,
//   selectPlanById,
//   updatePlans,
// } from "./planSlice";
// import { updateSpeeds } from "../speed/speedSlice";
// import "./UpdatePlanForm.modal.css";

// const UpdatePlanForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { planId } = useParams();

//   const [addRequestStatus, setAddRequestStatus] = useState("idle");
//   const [id, setId] = useState(null);
//   const [speeds, setSpeeds] = useState([{ mb: "" }]);
//   const [planName, setPlanName] = useState("");

//   useEffect(() => {
//     dispatch(fetchPlans());
//   }, [dispatch]);

//   const plan = useSelector((state) =>
//     selectPlanById(state, Number(planId))
//   );

//   useEffect(() => {
//     if (plan) {
//       setId(plan.id);
//       setPlanName(plan.planName);
//       setSpeeds(plan.speed.map((speed) => ({ mb: speed.mb })));
//     }
//   }, [plan]);

//   const canSave =
//     [id, planName].every(Boolean) && addRequestStatus === "idle";

//   const onUpdate = async (event) => {
//     event.preventDefault();

//     if (canSave) {
//       try {
//         setAddRequestStatus("pending");

        // const updatedPlan = await dispatch(
        //   updatePlans({
        //     plans: {
        //       id,
        //       planName,
        //     },
        //   })
        // ).unwrap();

//         const planId = updatedPlan.id;
//         const speedsWithPlanId = speeds.map((speed) => ({
//           ...speed,
//           planId: planId,
//         }));

//         await dispatch(updateSpeeds(speedsWithPlanId)).unwrap();

//         setId(null);
//         setPlanName("");
//         setSpeeds([{ mb: "" }]);

//         navigate("/");
//       } catch (error) {
//         console.error("Failed to update the plan", error);
//       } finally {
//         setAddRequestStatus("idle");
//       }
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

//   if (!plan) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="plan-form">
//       <h2>Update New Plan</h2>
//       <form onSubmit={onUpdate}>
//         <div className="form-group">
//           <label htmlFor="planName">Plan Name</label>
//           <input
//             type="text"
//             id="planName"
//             value={planName}
//             onChange={(e) => setPlanName(e.target.value)}
//             required
//           />
//         </div>
//         {speeds.map((speed, index) => (
//           <div key={index} className="speed-input-container">
//             <input
//               type="text"
//               className="form-input"
//               value={speed.mb}
//               onChange={(e) => {
//                 const updatedSpeeds = [...speeds];
//                 updatedSpeeds[index].mb = e.target.value;
//                 setSpeeds(updatedSpeeds);
//               }}
//             />
//             <button
//               type="button"
//               className="remove-button"
//               onClick={() => removeSpeed(index)}
//             >
//               Remove Speed
//             </button>
//           </div>
//         ))}
//         <button type="button" className="add-button" onClick={addSpeed}>
//           Add Speed
//         </button>

//         <div className="form-group">
//           <button type="submit" disabled={!canSave}>
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdatePlanForm; Coded By Chat GPT but cannot update speed arrays


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPlans,
  selectPlanById,
  updatePlans
} from "./planSlice";
import { updateSpeeds } from "../speed/speedSlice";
import "./UpdatePlanForm.modal.css";

const UpdatePlanForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const { planId } = useParams();

  const plan = useSelector((state) => selectPlanById(state, Number(planId)));
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [id, setId] = useState(plan?.id);
  const [speeds, setSpeeds] = useState([]);

  useEffect(() => {
    if (plan) {
      setSpeeds(plan.speed.map((speed) => ({ id: speed.id, mb: speed.mb })));
    }
  }, [plan]);

  const [planName, setPlanName] = useState(plan?.planName);

  const canSave = [id, planName].every(Boolean) && addRequestStatus === "idle";

  const onUpdate = async (event) => {
    event.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        // const updatedPlan = 
        await dispatch(
          updatePlans({
            plans: {
              id,
              planName,
            },
          })
        ).unwrap();

        // const updatedPlan = {
        //   id,
        //   planName,
        // };

        // await dispatch(updatePlans(updatedPlan)).unwrap();

        const updatedSpeeds = speeds.map((speed) => ({
          id: speed.id,
          mb: speed.mb,
          planId: id,
        }));

        await dispatch(updateSpeeds({ planId: id, speeds: updatedSpeeds })).unwrap();
        console.log("Haha" + updatedSpeeds)

        setPlanName("");
        setSpeeds([]);
        navigate("/");
      } catch (error) {
        console.error("Failed to update the plan", error);
      } finally {
        setAddRequestStatus("idle");
      }
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
    <div className="plan-form">
      <h2>Update New Plan</h2>
      <form onSubmit={onUpdate}>
        <div className="form-group">
          <label htmlFor="planName">Plan Name</label>
          <input
            type="text"
            id="planName"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </div>
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

        <div className="form-group">
          <button type="submit" disabled={!canSave}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlanForm;



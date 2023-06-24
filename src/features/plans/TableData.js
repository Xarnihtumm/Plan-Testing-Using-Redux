// // import React from "react";
// // import { useDispatch } from "react-redux";
// // import { deletePlan } from "./planSlice";
// // import { useNavigate } from "react-router-dom";

// // function TableData({ plan }) {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   console.log(plan);
// // const handleDelete = () => {
// //   try {
// //     // Dispatch action to delete the plan
// //     console.log("This is paln Id Of Yor to delete" + plan.id);
// //     dispatch(deletePlan(plan.id));
// //   } catch (error) {
// //     console.log(`Failed to delete the plan ${error}`);
// //   }
// // };

// // const handleEdit = () => {
// //   // Navigate to the edit page with the plan ID as a parameter
// //   navigate(`/edit/${plan.id}`);
// // };

// //   return (
// //     <div className="item">
// //       <div>
// //         <h3>{plan.planName}</h3>
// //         {plan.speed.map((speed) => (
// //           <div key={speed.id}>
// //             <p>{speed.mb} MB</p>
// //           </div>
// //         ))}
// //       </div>
// //       <div>
// //         <button className="btn btn-danger" onClick={handleDelete}>
// //           Delete
// //         </button>
// //         <button className="btn btn-primary" onClick={handleEdit}>
// //           Edit
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default TableData;  Code by zar ni tun

// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { deletePlan } from "./planSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchSpeeds } from "../speed/speedSlice";

// function TableData({ plan }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [hoveredSpeed, setHoveredSpeed] = useState(null);

//   useEffect(() => {
//     dispatch(fetchSpeeds());
//   }, [dispatch]);
//   const handleDelete = () => {
//     try {
//       // Dispatch action to delete the plan
//       console.log("This is paln Id Of Yor to delete" + plan.id);
//       dispatch(deletePlan(plan.id));
//     } catch (error) {
//       console.log(`Failed to delete the plan ${error}`);
//     }
//   };

//   const handleEdit = () => {
//     // Navigate to the edit page with the plan ID as a parameter
//     navigate(`/edit/${plan.id}`);
//   };

//   const handleDeletespeed = (speedId) => {
//     try {
//       // Dispatch action to delete the speed
//       console.log("This is speed ID to delete: " + speedId);
//       // Add your delete speed logic here
//     } catch (error) {
//       console.log(`Failed to delete the speed ${error}`);
//     }
//   };

//   const handleEditspeed = (speedId) => {
//     // Navigate to the edit page with the speed ID as a parameter
//     navigate(`/edit/${speedId}`);
//   };

//   const handleSpeedMouseEnter = (speedId) => {
//     setHoveredSpeed(speedId);
//   };

//   const handleSpeedMouseLeave = () => {
//     setHoveredSpeed(null);
//   };

//   return (
//     <div className="item">
//       <div>
//         <h3>{plan.planName}</h3>
//         {plan.speed.map((speed) => (
//           <div
//             key={speed.id}
//             onMouseEnter={() => handleSpeedMouseEnter(speed.id)}
//             onMouseLeave={handleSpeedMouseLeave}
//           >
//             <p>{speed.mb} MB</p>
//             {hoveredSpeed === speed.id && (
//               <div>
//                 <Link
//                   to="/discount"
//                   state={{
//                     speed: speed.id,
//                   }}
//                 >
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleEditspeed(speed.id)}
//                   >
//                     Create Discount
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <button className="btn btn-danger" onClick={handleDelete}>
//         Delete
//       </button>
//       <button className="btn btn-primary" onClick={handleEdit}>
//         Edit
//       </button>
//     </div>
//   );
// }

// export default TableData;  Coded by zar ni

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePlan } from "./planSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchSpeeds } from "../speed/speedSlice";
import "./TableData.css";

function TableData({ plan }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredSpeed, setHoveredSpeed] = useState(null);

  useEffect(() => {
    dispatch(fetchSpeeds());
  }, [dispatch]);

  const handleDelete = () => {
    try {
      // Dispatch action to delete the plan
      console.log("This is plan ID to delete: " + plan.id);
      dispatch(deletePlan(plan.id));
    } catch (error) {
      console.log(`Failed to delete the plan ${error}`);
    }
  };

  const handleEdit = () => {
    // Navigate to the edit page with the plan ID as a parameter
    navigate(`/edit/${plan.id}`);
  };

  const shoow = (speedId) => {
    try {
      // Dispatch action to delete the speed
      console.log("This is speed ID to delete: " + speedId);
      // Add your delete speed logic here
    } catch (error) {
      console.log(`Failed to delete the speed ${error}`);
    }
  };

  const handleEditSpeed = (speedId) => {
    // Navigate to the edit page with the speed ID as a parameter
    navigate(`/edit/${speedId}`);
  };

  const handleSpeedMouseEnter = (speedId) => {
    setHoveredSpeed(speedId);
  };

  const handleSpeedMouseLeave = () => {
    setHoveredSpeed(null);
  };

  return (
    <div className="card">
      <h3 className="card-title">{plan.planName}</h3>
      {plan.speed.map((speed) => (
        <div
          key={speed.id}
          className={`speed-item ${hoveredSpeed === speed.id ? "hovered" : ""}`}
          onMouseEnter={() => handleSpeedMouseEnter(speed.id)}
          onMouseLeave={handleSpeedMouseLeave}
        >
          <p className="speed-value">{speed.mb} MB</p>
          {hoveredSpeed === speed.id && (
            <div className="speed-actions">
              <Link
                to="/discount"
                state={{
                  speed: speed.id,
                  mb:speed.mb
                }}
              >
                <button
                  className="btn-create-discount"
                  onClick={() => handleEditSpeed(speed.id)}
                >
                  Create Discount
                </button>
              </Link>

              <Link
                to="/viewdiscount"
                state={{
                  speedId: speed.id,
                  mb:speed.mb
                }}
              >
              <button>
                View Discount
              </button>
              </Link>
            </div>
          )}
        </div>
      ))}
      <div className="plan-actions">
        <button className="btn-delete-plan" onClick={handleDelete}>
          Delete Plan
        </button>
        <button className="btn-edit-plan" onClick={handleEdit}>
          Edit Plan
        </button>
      </div>
    </div>
  );
}

export default TableData;


import React from "react";
import { useDispatch } from "react-redux";
import { deletePlan } from "./planSlice";
import { useNavigate } from "react-router-dom";

function TableData({ plan }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      // Dispatch action to delete the plan
      console.log("This is paln Id Of Yor to delete"+   plan.id)
      dispatch(deletePlan(plan.id));
    } catch (error) {
      console.log(`Failed to delete the plan ${error}`);
    }
  };

  const handleEdit = () => {
    // Navigate to the edit page with the plan ID as a parameter
    navigate(`/edit/${plan.id}`);
  };

  return (
    <div className="item">
      <div>
        <h3>{plan.planName}</h3>
       
      </div>
      <div>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default TableData;

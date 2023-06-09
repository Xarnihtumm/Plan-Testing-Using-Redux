import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPlanById, updatePlans} from "./planSlice";
import "./UpdatePlanForm.modal.css";

const UpdatePlanForm = () => {

  const  {planId }  = useParams();
  
  
  const plan = useSelector((state) => selectPlanById(state, Number(planId)));
  console.log(planId);
  console.log(plan);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [id,setId] =useState(plan?.id);
  const [planName, setPlanName] = useState(plan?.planName);
  const canSave = [id,planName].every(Boolean) && addRequestStatus === 'idle'
  const onUpdate = (event)=>{
    event.preventDefault();
    //console.log(token)

    if(canSave){
        try {

            setAddRequestStatus('pending');

            dispatch(
                
                updatePlans({
                    plans:{
                        id,
                        planName
                       
                        
                        
                    }//,
                    //token
                }),
            ).unwrap();
            setPlanName('')
           
            
            navigate("/")
           } catch (error) {
            console.error('failed to save the post',error)
           }finally{
            setAddRequestStatus('idle')
           }
        }
       // Perform form submission logic here
       // ...
   
       // Reset form fields
       setPlanName('');
      
     };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // setAddRequestStatus("pending")
  //   // Create a new plan object
  //   const newPlan = {
  //     planName,
  //     price,
  //     speed,
  //   };

  //   // Dispatch the createPlan action
  //   dispatch(updatePlans (newPlan));

  //   // Redirect to the PlanList page
  //   navigate("/");
  // };

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
        <div className="form-group">
          <button type="submit"  disabled={!canSave}>Update</button>
        </div>
      </form>
    </div>
 
  );
};

export default UpdatePlanForm;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './planForm.modal.css';
import { addNewPlans } from './planSlice';

const Form = () => {
  const [planName, setPlanName] = useState('');

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canCreate = [planName].every(Boolean) && addRequestStatus === 'idle'
  const navigate = useNavigate();
    const dispatch = useDispatch();

  
  const handleSubmit = (e) => {
    e.preventDefault();


    if(canCreate){
        try {
 
         dispatch(addNewPlans({
           planName
         }
       )).unwrap();
         setPlanName('')
        
         
         navigate('/')
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

  return (
    <div className="form-container">
      <h2>Create a New Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="planName">Plan Name:</label>
          <input
            type="text"
            id="planName"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </div>
      
       
        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
};

export default Form;

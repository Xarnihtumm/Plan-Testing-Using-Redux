import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate ,useLocation} from 'react-router-dom';
import './planForm.modal.css';
import { addNewDiscount } from './discountSlice';

const DiscountForm = () => {

    const location = useLocation();
    const {speed,mb} = location.state;
  const [months, setMonth] = useState('');
  const [prices, setPrices] = useState('');
  const [discountName, setDiscountName] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');

  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const canCreate =
    [months,prices, discountName,discountAmount].every(Boolean) &&
    addRequestStatus === 'idle';

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(speed)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (canCreate) {
      try {
        const speedId = speed; // Replace with the actual speedId
        const discount = {
          months,
          prices,
          discountName,
          discountAmount,
        };

        dispatch(addNewDiscount({ speedId, discount })).unwrap();

        setMonth('');
        setPrices('');
        setDiscountName('');
        setDiscountAmount('');

        navigate('/');
      } catch (error) {
        console.error('Failed to save the discount', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Discount for {mb} MB</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="month">Month:</label>
          <input
            type="text"
            id="month"
            value={months}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prices">Prices:</label>
          <input
            type="text"
            id="prices"
            value={prices}
            onChange={(e) => setPrices(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discountName">Discount Name:</label>
          <input
            type="text"
            id="discountName"
            value={discountName}
            onChange={(e) => setDiscountName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discountAmount">Discount Amount:</label>
          <input
            type="text"
            id="discountAmount"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Discount</button>
      </form>
    </div>
  );
};

export default DiscountForm;

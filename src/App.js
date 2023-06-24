import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PlanList from './features/plans/PlanList';
import PlanForm from './features/plans/PlanForm';
import UpdatePlanForm from './features/plans/UpdatePlanForm';
import PlanSpeedDiscountForm from './features/plans/PlanSpeedDiscountForm';
import DiscountForm from './features/discount/DiscountForm';
import Discount from './features/discount/Discount';

function App() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   loadUsers();
  // }, []);

  // const loadUsers = async () => {
  //   const result = await axios.get("http://localhost:8383/api/plans/all");
  //   setUsers(result.data);
  //   console.log(result)
  // };
  return (
    <Router>
    <Routes>
    <Route path="/" element={<PlanSpeedDiscountForm />} />
       <Route path="/list" element={<PlanList />} />
       <Route path="plan-form" element={<PlanForm/>} /> 
       <Route path="discount" element={<DiscountForm/>} /> 
       <Route path="viewdiscount" element={<Discount/>} /> 
       <Route path="edit/:planId" element={<UpdatePlanForm/>} /> 
    </Routes>
  </Router>
  );
}

export default App;

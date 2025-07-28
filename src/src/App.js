import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AdminTrends from './pages/AdminDashboard';
import CustomerQuote from './pages/CustomerQuote';
import UtilizationChart from './pages/utilizationChart';
import PricingList from './pages/PricingList.js'
import Home from './pages/home/Home';
// import Sidebar from './components/sidebar/Sidebar.js'



import AppLayout from "./layouts/AppLayout";
function App() {
  return (
    <div className="main">
    <BrowserRouter>
      
          <Routes>
            <Route path="/" element={<AppLayout/>} >
            <Route index element={<Home/>}/>
            <Route path='/pricingList' element={<PricingList/>} />
            <Route path="/admintrend" element={<AdminTrends />} />
            <Route path="/utilization" element={<UtilizationChart />} />
            <Route path="/customerquote" element={<CustomerQuote />} />
            </Route>
          </Routes>
        
    </BrowserRouter>
    </div>
  );
}

export default App;

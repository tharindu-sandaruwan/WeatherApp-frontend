import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from '../pages/Login';
import Weather from '../pages/Weather';

const Routers = () => {
    return (
      <div>
        <Router>
          <Routes>
           
            <Route path="/" element={<Login />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </Router>
      </div>
    );
  };
  
  export default Routers;
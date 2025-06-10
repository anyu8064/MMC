import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './MainPage/Login';
import Dashboard from './MainPage/Dashboard';
import ForgotPass from './modules/ForgotPass';
import ResetPass from './modules/ResetPassword';
import AuthContextProvider from './context/AuthContext';
import LaptopDesktop from './MainPage/LaptopDesktop';
import ITPeripherals from './MainPage/ITPeripherals';
import Software from './MainPage/Software';
import ServiceUnit from './MainPage/ServiceUnit';
import Tablet from './MainPage/eRxTablets';
import Printers from './MainPage/Printers';
import CABs from './MainPage/CABs';
import Accountability from './MainPage/Accountability';
import Archive from './MainPage/Archive';
//import PrivateRoute from './context/PrivateRoute';


export default function App() {

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPass />} />
          <Route path='/reset-password' element={<ResetPass />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/laptop-desktop' element={<LaptopDesktop />} />
          <Route path='/it-peripherals' element={<ITPeripherals />} />
          <Route path='/software' element={<Software />} />
          <Route path='/service-unit' element={<ServiceUnit />} />
          <Route path='/erx-tablets' element={<Tablet />} />
          <Route path='/printers' element={<Printers />} />
          <Route path='/cabs' element={<CABs />} />
          <Route path='/accountability' element={<Accountability />} />
          <Route path='/archive' element={<Archive />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}


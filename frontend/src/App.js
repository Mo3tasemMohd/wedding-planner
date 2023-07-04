import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/customer/Home';
import { ProviderService } from './pages/provider/providerServices';
import { CustomerService } from './pages/customer/customerServices';
import { AboutUs } from './pages/customer/AboutUs';
import ServiceForm from './pages/provider/ServiceForm';
import { Mynav } from './pages/customer/Mynav';
import { ServiceDetails } from './pages/customer/ServiceDetails';

function App() {
  return (
    <div className="App">
      <Mynav />
      <Routes>
        {/* Authentication routes */}
        <Route path='' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />

        {/* Customer routes */}
        <Route path='/customer/services' element={<CustomerService />} />
        <Route path='/customer/services/:id' element={<ServiceDetails />} />
        <Route path='/provider/services/:id' element={<ServiceDetails />} />

        {/* Provider routes */}
        <Route path='/provider/services' element={<ProviderService />} />

        {/* <Route path='/provider/services/:id' element={<ServiceDetails />} /> */}
        <Route path='/provider/services/:id/edit' element={<ServiceForm />} />

        <Route path='/about' element={<AboutUs />} />

        <Route path='*' element={<NotFound />} />
        <Route path='/not_found' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/customer/Home';
import { ProviderService } from './pages/provider/providerServices';
import ServiceForm from './pages/provider/ServiceForm';
import { Mynav } from './pages/customer/Mynav';
import { CustomerCardsContainer } from './components/CustomerCardsContainer';

function App() {
  return (
    <div className="App">
      {/* <Mynav/> */}
      {/* <CustomerCardsContainer /> */}
      <Routes>
        {/* Authentication routes */}
        <Route path='' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />

        {/* Customer routes */}
        <Route path='/services' element={<CustomerCardsContainer />} />

        {/* Provider routes */}
        <Route path='/provider/services' element={<ProviderService />} />

        {/* <Route path='/provider/services/:id' element={<ServiceDetails />} /> */}
        <Route path='/provider/services/:id/edit' element={<ServiceForm />} />

        <Route path='//' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

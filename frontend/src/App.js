import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/customer/Home';
import { ProviderService } from './pages/provider/providerServices';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Authentication routes */}
        <Route path='' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>

        {/* Customer routes */}

        {/* Provider routes */}
        <Route path='/provider/services' element={<ProviderService />} />
        <Route path='//' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

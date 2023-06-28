import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Authentication routes */}

        {/* Customer routes */}

        {/* Provider routes */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

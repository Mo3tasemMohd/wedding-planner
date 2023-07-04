import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/customer/Home";
import { ProviderService } from "./pages/provider/providerServices";
import { CustomerService } from "./pages/customer/customerServices";
import ServiceForm from "./pages/provider/ServiceForm";
import { Mynav } from "./pages/customer/Mynav";
import { useLocation } from "react-router-dom";
import AuthContext, { UserContext } from "./context/UserContext";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config/dataService";
import { ServiceDetails } from './pages/customer/ServiceDetails';

function App() {
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  const [user, setUser] = useState("");
  let validation = () => {
    axios
      .get(`${BASE_URL}/customer/get-customer/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((user) => {
        setUser(user.data);
        console.log(user.data);
      })
      .catch((err) => {
        // setErr(err.response.data.detail);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) validation();
    else setUser({})
  }, [localStorage.getItem("token")]);

  return (
    <div className="App">
      <AuthContext.Provider value={user}>
        {!isAuthRoute && <Mynav />}

        <Routes>
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer routes */}
          <Route path="/home" element={<Home />} />
          <Route path="" element={<Home />} />

          {(user && !user.is_provider)&& (
            <>
              <Route path="/customer/services" element={<CustomerService />} />
        <Route path='/customer/services/:id' element={<ServiceDetails />} />
        <Route path='/provider/services/:id' element={<ServiceDetails />} />

              {/* Provider routes */}
              <Route path="/provider/services" element={<ProviderService />} />

              {/* <Route path='/provider/services/:id' element={<ServiceDetails />} /> */}
              <Route
                path="/provider/services/:id/edit"
                element={<ServiceForm />}
              />
            </>
          )}
          <Route path="*/" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

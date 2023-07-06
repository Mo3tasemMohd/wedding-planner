import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { ProviderService } from "./pages/providerServices";
import ServiceForm from "./pages/ServiceForm";
import { Mynav } from "./components/Mynav";
import { useLocation } from "react-router-dom";
import AuthContext, { UserContext } from "./context/UserContext";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config/dataService";
import { CategoryServices } from "./pages/CategoryServices";
import { Package } from "./pages/Package";
import { ServiceDetails } from "./pages/ServiceDetails";
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
          {/* &&&&& */}<Route path="/login" element={<Login />} />
          {/* &&&&& */}<Route path="/register" element={<Register />} />

          {/* Customer routes */}
          {/* &&&&& */}<Route path="/home" element={<Home />} />
          {/* &&&&& */}<Route path="" element={<Home />} />
          {/* &&&&& */}<Route path='/about' element={<AboutUs />} />
          {/* &&&&& */}<Route path="/services" element={<CategoryServices />} />
          {/* &&&&& */}<Route path='/services/:id' element={<ServiceDetails />} />

          {(user && user.is_provider) && (
            <>
              {/* Provider routes */}
              {/* &&&&& */}<Route path="/services/:id/edit" element={<ServiceForm />} />
              {/* &&&&& */}<Route path="/myservices" element={<ProviderService />} />
            </>
          )}
          {(user && !user.is_provider) && (
            <>
              {/* Customer routes */}
              {/* &&&&& */}<Route path="/package" element={<Package />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

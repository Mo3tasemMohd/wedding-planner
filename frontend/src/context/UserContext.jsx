import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../config/dataService";
// import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

// export const UserContext = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState("");
//   let validation = () => {
//     axios
//       .get(`${BASE_URL}/customer/get-customer/`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((user) => {
//         setUser(user.data);
//       })
//       .catch((err) => {
//         // setErr(err.response.data.detail);
//       });
//   };

//   let logoutUser = () => {
//     setUser({});
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   let contextData = {
//     user,
//     logoutUser,
//     validation,
//   };

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };

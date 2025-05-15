// // App.js
import './App.css';
import AuthHeader from "./components/AuthHeader";
import AppRoutes from './routes/AppRoutes';

// function App() {
//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <AuthHeader />
//       <AppRoutes />
//     </div>
//   );
// }

// export default App;


import React from "react";
import { useAuth } from "./auth/authContext";

function App() {
  const { user, signIn, logout, signUp, confirmSignUp } = useAuth();

  return (
    <div>
      <div className="p-4 max-w-6xl mx-auto">
        <AuthHeader />
        <AppRoutes />
      </div>

    </div>
  );
}

export default App;

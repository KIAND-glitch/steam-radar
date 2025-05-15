// src/auth/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  signIn,
  signUp,
  confirmSignUp,
  refreshSession,
  logout,
} from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on app load
  useEffect(() => {
    const init = async () => {
      try {
        const tokens = await refreshSession();
        // After refreshing session
        if (tokens) {
            setTokens(tokens);
            const decoded = jwtDecode(tokens.IdToken);
            setUser(decoded); // Now user has email, sub, etc.
        }
  
      } catch (e) {
        console.error("Session restore failed");
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleSignIn = async (username, password) => {
    const tokens = await signIn(username, password);
    setTokens(tokens);
  
    if (tokens?.IdToken && typeof tokens.IdToken === "string") {
      const decoded = jwtDecode(tokens.IdToken);
      setUser(decoded);
    } else {
      console.warn("No idToken found in signIn response");
      setUser(null);
    }
  };
  

  const handleLogout = () => {
    logout();
    setTokens(null);
    setUser(null);
  };

  const value = {
    user,
    tokens,
    loading,
    signIn: handleSignIn,
    signUp,
    confirmSignUp,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

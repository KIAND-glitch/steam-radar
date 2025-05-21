// components/AuthHeader.js
import React from "react";
import { useAuth } from "../auth/authContext";
import { jwtDecode } from "jwt-decode";

const AuthHeader = () => {
  const { tokens, user, loading, logout, signIn } = useAuth();

  const handleLogout = () => {
    logout();
    // Optional redirect
    window.location.href = "http://localhost:3000/";
  };

  let userEmail = null;

  if (tokens?.IdToken) {
    try {
      const decoded = jwtDecode(tokens.IdToken);
      userEmail = decoded.email;
    } catch (e) {
      console.error("Token decoding failed", e);
    }
  }
  console.log('auth', tokens);
  if (loading) return <div>Loading auth...</div>;

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-center">🎬 StreamRadar</h1>

      <div>
        {tokens ? (
          <div className="flex items-center gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => (window.location.href = "/watchlist")}
            >
              View Watchlist
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => (window.location.href = "/login")}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;

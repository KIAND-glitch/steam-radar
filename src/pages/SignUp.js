import React, { useState } from "react";
import { useAuth } from "../auth/authContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { signUp, confirmSignUp } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert("Sign-up successful! Please check your email for the confirmation code.");
      setIsConfirmed(true); // Show confirmation code input after sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp(email, confirmationCode);
      alert("Account confirmed! You can now log in.");
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md"></div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {!isConfirmed ? (
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Sign Up
                    </button>
                </form>
            ) : (
                <form onSubmit={handleConfirm} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmation Code:</label>
                        <input
                            type="text"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        Confirm Account
                    </button>
                </form>
            )}
            <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                    Login
                </a>
            </p>
    </div>
)
};

export default SignUp;

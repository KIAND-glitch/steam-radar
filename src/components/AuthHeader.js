// components/AuthHeader.js
import { useAuth } from "react-oidc-context";

const AuthHeader = () => {
  const auth = useAuth();

  const signOutRedirect = () => {
    auth.removeUser();
    const clientId = "42pg35gdbfjmc3vuqqf8n29t3t";
    const logoutUrl = `https://ap-southeast-2uxhrcakks.auth.ap-southeast-2.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${encodeURIComponent("http://localhost:3000/")}`;
    window.location.href = logoutUrl;
  };

  if (auth.isLoading) return <div>Loading auth...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  console.log("Auth state:", auth);

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-center">🎬 StreamRadar</h1>

      <div>
        {auth.isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="text-sm">👤 {auth.user?.profile.email}</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={signOutRedirect}>
              Sign out
            </button>
          </div>
        ) : (
          <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => auth.signinRedirect()}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;

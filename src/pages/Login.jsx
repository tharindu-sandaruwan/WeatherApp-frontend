import React, { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather App</h1>
          <p className="text-gray-600">Redirecting to authentication...</p>
        </div>
        
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg font-semibold text-gray-700">Please wait...</span>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Secure authentication powered by Auth0</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

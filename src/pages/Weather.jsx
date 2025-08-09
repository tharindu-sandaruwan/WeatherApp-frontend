import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:8080/weather', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      if (err.name === 'TypeError' || err.message.includes('Failed to fetch')) {
        window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
        return;
      }
      setError('Failed to load weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    window.location.href = 'http://localhost:8080/logout';
  };

  const handleRefresh = () => {
    console.log('Refresh button clicked');
    fetchWeatherData();
  };

  const handleAddCity = () => {
    if (searchCity.trim()) {
      // This would typically call an API to add a new city
      console.log('Adding city:', searchCity);
      setSearchCity('');
    }
  };

  const handleRemoveCity = (index) => {
    const newWeatherData = weatherData.filter((_, i) => i !== index);
    setWeatherData(newWeatherData);
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    if (desc.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  const getCardColor = (index) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-orange-400 to-orange-600',
      'bg-gradient-to-br from-red-400 to-red-600'
    ];
    return colors[index % colors.length];
  };

  const formatTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}.${formattedMinutes}${ampm}`;
  };

  const formatDate = () => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[now.getMonth()]} ${now.getDate()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-lg font-semibold text-white">Loading weather data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchWeatherData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Background clouds */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl">☁️</div>
        <div className="absolute top-40 right-20 text-4xl">☁️</div>
        <div className="absolute bottom-40 left-20 text-5xl">☁️</div>
        <div className="absolute bottom-20 right-10 text-3xl">☁️</div>
      </div>

             {/* Header */}
       <div className="relative z-10 pt-8 pb-6">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8">
             <div className="flex items-center justify-center mb-4">
               <span className="text-4xl mr-3">☀️</span>
               <h1 className="text-4xl font-bold text-white">Weather App</h1>
             </div>
           </div>
         </div>
       </div>

      {/* Weather Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {weatherData.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-300 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Weather Data</h2>
            <p className="text-gray-300">No weather information is currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weatherData.map((weather, index) => (
              <div key={index} className={`${getCardColor(index)} rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition duration-300 relative`}>
                {/* Close button */}
                
                
                <div className="p-6 text-white">
                  {/* City and Time */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{weather.name}</h3>
                  </div>
                  
                  {/* Main Weather Info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getWeatherIcon(weather.description)}</span>
                      <div>
                        <p className="font-semibold capitalize">{weather.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">{weather.temp}°C</div>
                    </div>
                  </div> 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      

             {/* Action Buttons */}
       <div className="fixed top-4 right-4 flex space-x-3 z-50">
         <button
           onClick={handleRefresh}
           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg cursor-pointer"
         >
           Refresh
         </button>
         <button
           onClick={handleLogout}
           className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg cursor-pointer"
         >
           Logout
         </button>
       </div>
    </div>
  );
};

export default Weather;

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SettingsPanel from '../components/SettingsPanel';

function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center mt-8">Please log in to view your profile.</div>;
  }

  const handleSaveSettings = async (settings) => {
    try {
      const token = await getAccessTokenSilently();
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      // Update local state or refetch profile
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Profile</h1>
      
      {/* User Info Section */}
      {user && (
        <div className="bg-white shadow-lg rounded-lg p-6 sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:flex sm:items-center">
            <img
              src={user.picture}
              alt={user.name}
              className="w-24 h-24 rounded-full mx-auto sm:mx-0 sm:mr-6 mb-4 sm:mb-0"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Section */}
      {userProfile && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">App Settings</h3>
          <SettingsPanel
            initialSettings={userProfile.preferences}
            onSave={handleSaveSettings}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;

import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import backgroundImage from '../assets/pexels-polina-kovaleva-8709543.jpg'

function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="relative w-full  bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Autism Connect</h1>
        <p className="text-lg mb-8">
          Your personalized digital assistant for social interactions
        </p>

        {isAuthenticated ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
            <Link
              to="/facial-analysis"
              className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition duration-300">
              Start Facial Analysis
            </Link>
            <Link
              to="/conversation-analysis"
              className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 transition duration-300">
              Start Conversation Analysis
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-4">Please log in to access the app features.</p>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-600 transition duration-300">
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

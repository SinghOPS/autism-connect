import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header className="bg-blue-500 text-gray-100 p-4 fixed top-0 left-0 right-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/autism-connect-logo.png"
            alt="Autism Connect"
            className="h-full w-32"
          />
        </div>
        <nav>
          <button
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
            onClick={() =>
              document.getElementById("mobile-menu").classList.toggle("hidden")
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link to="/" className="hover:underline text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:underline text-lg">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/facial-analysis" className="hover:underline text-lg">
                Facial Analysis
              </Link>
            </li>
            <li>
              <Link
                to="/conversation-analysis"
                className="hover:underline text-lg">
                Conversation Analysis
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="hover:underline text-lg">
                  Log Out
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow">
                  Log In
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div id="mobile-menu" className="hidden mt-4 md:hidden">
        <ul className="space-y-2 text-center text-lg">
          <li>
            <Link to="/" className="block hover:bg-blue-600 p-2 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block hover:bg-blue-600 p-2 rounded">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/facial-analysis"
              className="block hover:bg-blue-600 p-2 rounded">
              Facial Analysis
            </Link>
          </li>
          <li>
            <Link
              to="/conversation-analysis"
              className="block hover:bg-blue-600 p-2 rounded">
              Conversation Analysis
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="block hover:bg-blue-600 p-2 rounded w-full text-left">
                Log Out
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={() => loginWithRedirect()}
                className="block bg-green-500 hover:bg-green-600 p-2 rounded w-full text-white">
                Log In
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;

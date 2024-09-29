import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FacialAnalysis from "./pages/FacialAnalysis";
import ConversationAnalysis from "./pages/ConversationAnalysis";
import Loading from "./components/Loading";


function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/facial-analysis"
              element={
                isAuthenticated ? <FacialAnalysis /> : <Navigate to="/" />
              }
            />
            <Route
              path="/conversation-analysis"
              element={
                isAuthenticated ? <ConversationAnalysis /> : <Navigate to="/" />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
  );
}

export default App;

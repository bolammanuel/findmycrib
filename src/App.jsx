import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/home/Homepage';
import PropertyDetail from './pages/PropertyDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/CreateListing';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/become-host" element={<CreateListing />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* We'll add more routes later */}
        {/* <Route path="/flatmate/:id" element={<FlatmateProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
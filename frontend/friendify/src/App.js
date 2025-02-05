import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import FeedPage from './pages/FeedPage';
import DrawerNav from './components/Drawer';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Use to get current path

  return (
    <div>
      {/* Conditionally render the DrawerNav based on current route */}
      {location.pathname !== '/signin' && <DrawerNav />}

        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/feedpage" element={<FeedPage />} />
        </Routes>
    
    </div>
  );
}

export default App;

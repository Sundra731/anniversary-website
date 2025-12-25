import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import WelcomePage from './pages/WelcomePage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleContinue = () => {
    setShowWelcome(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LandingPage onSuccess={handleLoginSuccess} />
      ) : showWelcome ? (
        <WelcomePage onContinue={handleContinue} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import RequestPage from './pages/RequestPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (!isAuthenticated) {
    return showSignup
      ? <SignupPage onSwitch={() => setShowSignup(false)} />
      : <LoginPage onSwitch={() => setShowSignup(true)} />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <RequestPage />
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './store/userSlice';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast.info(
      !isDarkMode ? "Dark mode activated ✨" : "Light mode activated ☀️", 
      { autoClose: 1500 }
    );
  };
  
  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID || 'test-project-id',
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY || 'test-public-key'
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID || 'test-project-id',
      view: 'both',
      onSuccess: function(user) {
        // Store user data in Redux store
        let currentPath = window.location.pathname + window.location.search;
        if (user && user.isAuthenticated) {
          dispatch(setUser(JSON.parse(JSON.stringify(user))));
          if (currentPath.includes('login') || currentPath.includes('signup')) {
            navigate('/dashboard');
          }
        } else if (!currentPath.includes('login')) {
          navigate(currentPath);
        } else {
          navigate('/login');
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
        toast.error("Authentication failed. Please try again.");
      }
    });
    
    setIsInitialized(true);
  }, [dispatch, navigate]);
  
  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    isAuthenticated,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
        toast.info("You have been logged out");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  return (
    <AuthContext.Provider value={authMethods}>
      <div className="min-h-screen flex flex-col">
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-grow">
          <Routes>
            {/* Public route with conditional content based on auth status */}
            <Route path="/" element={<Home />} />
            
            {/* Public routes - accessible only when NOT authenticated */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add other protected routes here */}
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-4 text-center text-surface-500 text-sm">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} TaskFlow. Stay organized.</p>
          </div>
        </footer>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
          toastClassName="!bg-white dark:!bg-surface-800 !shadow-card"
          bodyClassName="!text-surface-800 dark:!text-surface-100"
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
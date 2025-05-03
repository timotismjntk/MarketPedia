
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForms from '@/components/auth/AuthForms';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Redirect to home or the page user was trying to access if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }
  
  return (
    <div className="app-container px-4 pt-4">
      <button 
        onClick={() => navigate('/')}
        className="p-2 -ml-2 text-gray-600 mb-6"
      >
        <ArrowLeft size={24} />
      </button>
      
      <AuthForms />
    </div>
  );
};

export default AuthPage;


import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthForms from '@/components/auth/AuthForms';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  
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

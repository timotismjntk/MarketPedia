import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      {/* Header Section with MartPedia and Image */}
      <div className="flex flex-col items-center text-center -mt-20">
        <img
          src="src/assets/image/martpedia.png"
          className="w-64 h-64 object-contain"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Login as
        </h1>
        {/* Buttons Section */}
        <div className="flex flex-row gap-4 w-full max-w-md">
          <Button
            className="flex-1 min-w-0 py-3 text-white bg-primary hover:bg-primary-600 transition-colors"
            onClick={() => navigate('/')}
          >
            Customer
          </Button>
          <Button
            className="flex-1 min-w-0 py-3 text-white bg-primary hover:bg-primary-600 transition-colors"
            onClick={() => navigate('/seller')}
          >
            Seller
          </Button>
          <Button
            className="flex-1 min-w-0 py-3 text-white bg-primary hover:bg-primary-600 transition-colors"
            onClick={() => navigate('/admin')}
          >
            Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
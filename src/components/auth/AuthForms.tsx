
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Mail, Smartphone } from 'lucide-react';

const AuthForms: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const { login, register, verifyOTP, sendOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSendOTP = async () => {
    try {
      setLoading(true);
      if (authMethod === 'email') {
        await sendOTP(email);
      } else {
        await sendOTP(phone);
      }
      setShowOTP(true);
    } catch (error) {
      console.error('Failed to send OTP', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const success = await verifyOTP(otp);
      if (success) {
        setShowOTP(false);
        // Proceed with login/registration after OTP verification
        handleSubmit();
      }
    } catch (error) {
      console.error('OTP verification failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      
      // Redirect to home or the page user was trying to access
      const from = location.state?.from?.pathname || '/';
      navigate(from);
      
    } catch (error) {
      console.error('Authentication failed', error);
    } finally {
      setLoading(false);
    }
  };

  if (showOTP) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Verify Your {authMethod === 'email' ? 'Email' : 'Phone'}</h1>
          <p className="text-gray-500 mt-2">
            Enter the 6-digit code sent to your {authMethod === 'email' ? email : phone}
          </p>
        </div>
        
        <div className="space-y-4">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          
          <Button 
            className="w-full" 
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6 || loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
          
          <p className="text-center text-sm text-gray-500">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleSendOTP}
              className="text-primary hover:underline font-medium"
              disabled={loading}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{isLogin ? 'Login' : 'Create an Account'}</h1>
        <p className="text-gray-500 mt-2">
          {isLogin 
            ? 'Sign in to access your account' 
            : 'Fill in the form below to create your account'}
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex items-center justify-center px-4 py-2 rounded-md ${
              authMethod === 'email' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Mail size={18} className="mr-2" />
            Email
          </button>
          
          <button
            type="button"
            onClick={() => setAuthMethod('phone')}
            className={`flex items-center justify-center px-4 py-2 rounded-md ${
              authMethod === 'phone' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Smartphone size={18} className="mr-2" />
            Phone
          </button>
        </div>
      </div>
      
      <form className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              placeholder="Enter your full name"
              required={!isLogin}
            />
          </div>
        )}
        
        {authMethod === 'email' ? (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              placeholder="Enter your email"
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              placeholder="Enter your phone number"
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            placeholder="Enter your password"
            required
          />
        </div>
        
        {isLogin && (
          <div className="flex justify-end">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        )}
        
        <Button
          type="button"
          className="w-full"
          onClick={authMethod === 'phone' ? handleSendOTP : handleSubmit}
          disabled={loading || (isLogin ? !email || !password : !name || !email || !password)}
        >
          {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
      
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center justify-center py-2">
            <Mail className="w-5 h-5 mr-2" />
            Email
          </Button>
          <Button variant="outline" className="flex items-center justify-center py-2">
            <Smartphone className="w-5 h-5 mr-2" />
            Phone
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';

const Login: React.FC = () => {
  const { login, verifyOTP } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    let interval: number;
    if (showOtpSection && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpSection, otpTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      if (err.message === 'OTP_REQUIRED') {
        setShowOtpSection(true);
        setOtpTimer(120);
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP(otp);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpTimer(120);
    setOtp('');
    setError('');
    // In production, call API to resend OTP
    console.log('Resending OTP...');
  };

  const handleBackToLogin = () => {
    setShowOtpSection(false);
    setOtp('');
    setError('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Logo */}
            <div className="text-center mb-8">
              <img
                src="/logo.png"
                alt="Aid & Attendance"
                className="mx-auto h-20 mb-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <h1 className="hidden text-3xl font-bold text-primary-700">
                Aid & Attendance
              </h1>
            </div>

            {!showOtpSection ? (
              /* Login Form */
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600">Welcome back! Please sign in to continue.</p>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input pl-10"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input pl-10"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full btn-lg flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-base text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <a
                    href="http://www.aidandattendance.com/"
                    className="btn btn-secondary w-full flex items-center justify-center"
                  >
                    I'm in the Wrong Spot
                  </a>
                </div>
              </form>
            ) : (
              /* OTP Verification Form */
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    One Time Verification Code
                  </h2>
                  <p className="text-gray-600">
                    For your security, we've sent a one-time code to{' '}
                    <strong className="text-gray-900">{email}</strong>. Please check your
                    email and enter the code below.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="otp" className="form-label">
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="form-input text-center text-2xl tracking-widest"
                    placeholder="000000"
                    autoComplete="one-time-code"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  {otpTimer > 0 ? (
                    <p className="text-gray-600">
                      Code expires in{' '}
                      <span className="font-semibold text-gray-900">
                        {formatTime(otpTimer)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium">Code expired</p>
                  )}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpTimer > 0}
                    className="text-primary-600 hover:text-primary-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Resend Code
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="btn btn-outline flex-1"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="btn btn-primary flex-1 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        Verifying...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Having trouble? Contact support at{' '}
          <a href="tel:888-600-1701" className="text-primary-600 hover:text-primary-700 font-medium">
            888-600-1701
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

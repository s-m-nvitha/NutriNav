import loginBg from '../assets/nutrinav-login-bg.png';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signup({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#071d18] flex items-center justify-center p-6">
      <div className="w-full max-w-[1500px] h-[720px] bg-white rounded-[30px] shadow-[0_10px_35px_rgba(0,0,0,0.08)] overflow-hidden flex">

        {/* Left Image */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src={loginBg}
            alt="NutriNav"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-16 -mt-4">

          <div className="w-full max-w-[460px]">

            <div className="mt-4 mb-6">
              <h2 className="text-[42px] font-bold text-[#0A5B37] leading-none mb-3">
                Create Account
              </h2>

              <p className="text-[15px] text-gray-500">
                Start your nutrition journey
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">

              <Input
                label="Full Name"
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                size="lg"
                className="w-full h-[54px] rounded-xl text-lg font-semibold"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>

            </form>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <p className="text-center text-[15px] text-gray-600 mt-4">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Sign In
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Signup;
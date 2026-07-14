  import loginBg from '../assets/nutrinav-login-bg.png';
  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { useAuth } from '../contexts/AuthContext';
  import Button from '../components/Button';
  import Input from '../components/Input';

  const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
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

      try {
        await login(formData);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.detail || 'Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
    <div className="min-h-screen overflow-hidden bg-[#071d18] flex items-center justify-center p-6">
      <div className="w-full max-w-[1380px] h-[620px] bg-white rounded-[30px] shadow-[0_10px_35px_rgba(0,0,0,0.08)] overflow-hidden flex">

        {/* Left Image Section */}
        <div className="hidden lg:block w-1/2 relative">
          <img
    src={loginBg}
    alt="NutriNav"
    className="w-full h-full object-cover object-center"
  />


          
        </div>

        {/* Right Login Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-14">

          <div className="w-full max-w-[520px]">

            <div className="mb-6">
  <h2 className="text-[48px] font-bold text-[#0A5B37] leading-none mb-3">
    Welcome Back
  </h2>

              <p className="text-base text-gray-500">
  Continue your nutrition journey
</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

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
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  required
/>

              <Button
  type="submit"
  size="lg"
  className="w-full h-[58px] rounded-xl text-xl font-semibold"
  disabled={loading}
>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

            </form>

  <div className="flex items-center my-5">
    <div className="flex-1 border-t border-gray-300"></div>
    <span className="px-4 text-gray-500">or</span>
    <div className="flex-1 border-t border-gray-300"></div>
  </div>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Sign Up
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
  };

  export default Login;

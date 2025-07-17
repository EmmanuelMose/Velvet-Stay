// src/pages/Login.tsx

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginInputs) => {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || 'Login successful');
        navigate('/home');
      } else {
        alert(result.error || result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-sm rounded-xl shadow-lg bg-white border border-gray-300">

        {/* Header */}
        <div className="bg-blue-700 text-white text-center py-3 rounded-t-xl hover:bg-green-600 transition-colors duration-300">
          <h1 className="text-xl font-semibold">Login to Your Account</h1>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Enter a valid email address',
                },
              })}
              placeholder="Email"
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.email?.message && typeof errors.email.message === 'string' && (
              <span className="text-xs text-red-700">{errors.email.message}</span>
            )}

            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Password"
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.password?.message && typeof errors.password.message === 'string' && (
              <span className="text-xs text-red-700">{errors.password.message}</span>
            )}

            <button
              type="submit"
              className="bg-blue-700 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-full text-sm"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <button type="button" className="text-blue-700 underline text-xs hover:text-green-600">
              Forgot Password?
            </button>
          </div>

          <div className="mt-4 flex flex-col items-center space-y-1 text-xs text-gray-600">
            <p>
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline hover:text-green-600">
                SignUp
              </a>
            </p>
            <p>
              <a href="/" className="text-blue-600 hover:underline hover:text-green-600">
                Back to Home
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

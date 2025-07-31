import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usersAPI } from '../../Features/users/usersAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
//import { useState } from 'react';

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  firstName: yup.string().max(50, 'Max 50 characters').required('First name is required'),
  lastName: yup.string().max(50, 'Max 50 characters').required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .max(100, 'Max 100 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .max(255, 'Max 255 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

function Register() {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation({ fixedCacheKey: 'createUser' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      await createUser(data).unwrap();
      toast.success('Registration successful! Please check your email to verify your account.');
      reset();

      setTimeout(() => {
        navigate('/auth/verify', { state: { email: data.email } });
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-white flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-900 hover:text-black transition duration-300 mb-6 text-center">
        Welcome to Registration Page
      </h1>

      <div className="w-full max-w-4xl m-5 rounded-2xl shadow-lg bg-blue-300 overflow-hidden flex flex-col md:flex-row gap-5">
        {/* Left: Registration Form */}
        <div className="w-full md:w-[50%] flex justify-center items-center m-5">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-green-900 animate-fade-in-up">
            <div className="bg-blue-900 text-white text-center py-3 rounded-t-2xl hover:bg-green-900 transition-colors duration-300">
              <h1 className="text-lg font-bold tracking-wide">Account Registration</h1>
            </div>

            <div className="p-5">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <input
                    type="text"
                    {...register('firstName')}
                    placeholder="First Name"
                    className="w-full px-3 py-2 border border-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                  {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('lastName')}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border border-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                  {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                    className="w-full px-3 py-2 border border-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 border border-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 flex justify-center items-center gap-2 bg-blue-900 text-white rounded-md font-medium hover:bg-green-900 transition-all duration-300 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading && (
                    <svg
                      className="h-4 w-4 animate-spinSlow text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  )}
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </form>

              <div className="mt-4 text-xs text-black text-center space-y-1">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-900 hover:underline hover:text-green-900">
                    SignIn
                  </Link>
                </p>
                <p>
                  <Link to="/" className="text-blue-900 hover:underline hover:text-green-900">
                    Back to Home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image with Text */}
        <div className="hidden md:flex md:w-[50%] relative bg-white overflow-hidden m-5 rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1050&q=80"
            alt="Register visual"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-3xl font-bold text-black animate-moveAndColor transition-all duration-300 hover:text-blue-600 hover:scale-105">
              Welcome And Enjoy Our Services!
            </h2>
            <p className="mt-4 text-sm text-black font-light max-w-xs animate-moveAndColor transition-all duration-300 hover:text-red-900 hover:scale-105">
              Sign up to access exclusive features and manage your tasks with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

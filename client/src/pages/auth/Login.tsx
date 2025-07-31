import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { loginAPI } from '../../Features/login/loginAPI';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Features/login/userSlice';
import { Link } from 'react-router-dom';

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').max(100).required('Email is required'),
  password: yup.string().min(6).max(255).required('Password is required'),
});

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || '';
  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: emailFromState,
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(loginSuccess(response));
      toast.success('Login successful!');
      navigate(response.user.role === 'Admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch {
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-white flex flex-col items-center">
      {/* Top Welcome Text */}
      <h1 className="text-3xl font-bold text-green-900 hover:text-black transition duration-300 mb-6 text-center">
        Welcome to Login Page
      </h1>

      <div className="w-full max-w-4xl m-5 rounded-2xl shadow-lg bg-blue-300 overflow-hidden flex flex-col md:flex-row gap-5">
        {/* Left: Login Form */}
        <div className="w-full md:w-[50%] flex justify-center items-center m-5">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-green-900 animate-fade-in-up">
            <div className="bg-blue-900 text-white text-center py-3 rounded-t-2xl hover:bg-green-900 transition-colors duration-300">
              <h1 className="text-lg font-bold tracking-wide">Login to Your Account</h1>
            </div>

            <div className="p-5">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Enter Your Email"
                    readOnly={!!emailFromState}
                    className="w-full px-3 py-2 border border-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                  {errors.email?.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                    className="w-full px-3 py-2 border border-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {errors.password?.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
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
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="text-center mt-2">
                <button className="text-blue-900 text-xs hover:text-green-900 underline transition">
                  Forgot Password?
                </button>
              </div>

              <div className="mt-4 text-xs text-black text-center space-y-1">
                <p>
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="text-blue-900 hover:underline hover:text-green-900">
                    SignUp
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

        {/* Right: Image with text */}
        <div className="hidden md:flex md:w-[50%] relative bg-white overflow-hidden m-5 rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1050&q=80"
            alt="Login visual"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-3xl font-bold text-black animate-moveAndColor transition-all duration-300 hover:text-blue-600 hover:scale-105">
              Welcome Back!
            </h2>
            <p className="mt-4 text-sm text-black font-light max-w-xs animate-moveAndColor transition-all duration-300 hover:text-red-900 hover:scale-105">
              Join us and explore powerful tools that transform your daily tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

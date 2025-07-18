import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { loginAPI } from '../../Features/login/loginAPI';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Features/login/userSlice';

type LoginInputs = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
});

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const emailFromState = location.state?.email || ''

    const [loginUser] = loginAPI.useLoginUserMutation()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailFromState,
        }
    });

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        console.log('Login data:', data);

        try {
            const response = await loginUser(data).unwrap()
            console.log("Login response:", response);
            dispatch(loginSuccess(response))

            console.log("Login response:", response);
            toast.success("Login successful!");

            if (response.user.role === 'admin') {
                navigate('/admin/dashboard/todos');
            } else if (response.user.role === 'user') {
                navigate('/user/dashboard/todos');
            }

        } catch (error) {
            console.log("Login error:", error);
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }

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

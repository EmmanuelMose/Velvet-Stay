import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
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
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log('Form submitted:', data);
    reset(); // Clears the input fields after successful submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-sm rounded-xl shadow-lg bg-white border border-gray-300">
        
        {/* Header with hover effect */}
        <div className="bg-blue-700 text-white text-center py-3 rounded-t-xl hover:bg-green-600 transition-colors duration-300">
          <h1 className="text-xl font-semibold">Login to Your Account</h1>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.email && (
              <span className="text-xs text-red-700">{errors.email.message}</span>
            )}

            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.password && (
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
            <button
              type="button"
              className="text-blue-700 underline text-xs hover:text-green-600"
            >
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
}

export default Login;

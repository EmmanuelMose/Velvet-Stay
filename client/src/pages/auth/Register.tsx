import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-sm rounded-xl shadow-lg bg-white border border-gray-300">
        
        {/* Header with hover effect */}
        <div className="bg-blue-700 text-white text-center py-3 rounded-t-xl hover:bg-green-600 transition-colors duration-300">
          <h1 className="text-xl font-semibold">Account Registration</h1>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            <input
              type="text"
              {...register('firstName')}
              placeholder="First Name"
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.firstName && (
              <span className="text-xs text-red-700">{errors.firstName.message}</span>
            )}

            <input
              type="text"
              {...register('lastName')}
              placeholder="Last Name"
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.lastName && (
              <span className="text-xs text-red-700">{errors.lastName.message}</span>
            )}

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

            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-700">{errors.confirmPassword.message}</span>
            )}

            <button
              type="submit"
              className="bg-blue-700 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-full text-sm mt-2"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline hover:text-green-600">
              SignIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

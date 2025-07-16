import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type VerifyInputs = {
  email: string;
  code: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  code: yup
    .string()
    .matches(/^\d{6}$/, 'Code must be a 6 digit number')
    .required('Verification code is required'),
});

const VerifyUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<VerifyInputs> = (data) => {
    console.log('Verification submitted:', data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-sm rounded-xl shadow-lg bg-white border border-gray-300">
        
        {/* Blue header with hover to green */}
        <div className="bg-blue-700 text-white text-center py-3 rounded-t-xl hover:bg-green-600 transition-colors duration-300">
          <h1 className="text-xl font-semibold">Verify Your Account</h1>
        </div>

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
              type="text"
              {...register('code')}
              placeholder="6 Digit Code"
              maxLength={6}
              className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.code && (
              <span className="text-xs text-red-700">{errors.code.message}</span>
            )}

            <button
              type="submit"
              className="bg-blue-700 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-full text-sm"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;

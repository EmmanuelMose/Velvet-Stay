import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usersAPI } from '../../Features/users/usersAPI';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

type VerifyInputs = {
    email: string;
    verificationCode: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    verificationCode: yup
        .string()
        .matches(/^\d{6}$/, 'Code must be a 6 digit number')
        .required('Verification code is required'),
});

const VerifyUser = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const emailFromState = location.state?.email || '';

    const [verifyUser] = usersAPI.useVerifyUserMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailFromState,
        },
    });

    const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
      console.log(data)
        try {
            const response = await verifyUser(data).unwrap();
            console.log("Verification response:", response);

            toast.success("Account verified successfully!");
            // Redirect or show success
            setTimeout(() => {
                navigate('/login', {
                    state: { email: data.email }
                });
            }, 2000);
        } catch (error) {
            console.error("Verification error:", error);
            toast.error(`Verification failed. Please check your code and try again`);
            // Error handling
        }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-sm rounded-xl shadow-lg bg-white border border-green-700">
        
        {/* Blue header with hover to green */}
        <div className="bg-blue-900 text-white text-center py-3 rounded-t-xl hover:bg-green-900 transition-colors duration-300">
          <h1 className="text-xl font-semibold">Verify Your Account</h1>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="bg-white border border-green-700 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.email && (
              <span className="text-xs text-red-700">{errors.email.message}</span>
            )}

            <input
              type="text"
              {...register('verificationCode')}
              placeholder="6 Digit Code"
              maxLength={6}
              className="bg-white border border-green-700 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.verificationCode && (
              <span className="text-xs text-red-700">{errors.verificationCode.message}</span>
            )}

            <button
              type="submit"
              className="bg-blue-900 hover:bg-green-900 text-white font-medium py-2 px-4 rounded w-full text-sm"
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

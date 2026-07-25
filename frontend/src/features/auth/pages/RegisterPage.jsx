import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { registerSchema } from '../validations/auth.schema.js';
import Input from '../../../shared/components/Input.jsx';
import Button from '../../../shared/components/Button.jsx';

function RegisterPage() {
    const { register: registerUser, isRegistering, registerError } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    });

    async function onSubmit(values) {
        try {
            const { confirmPassword, ...payload } = values;
            void confirmPassword; // client-side only, never sent to the backend
            await registerUser(payload);
            navigate('/', { replace: true });
        } catch {
            // registerError from useAuth already reflects the failure; nothing further needed here
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-sm">
                <h1 className="mb-6 text-xl font-semibold text-gray-900">Create an account</h1>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                    <Input
                        id="name"
                        label="Name"
                        type="text"
                        error={errors.name?.message}
                        {...register('name')}
                    />

                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <Input
                        id="confirmPassword"
                        label="Confirm password"
                        type="password"
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />

                    {registerError && (
                        <p className="text-sm text-red-600" role="alert">
                            {registerError.message}
                        </p>
                    )}

                    <Button type="submit" isLoading={isRegistering} className="mt-2 w-full">
                        Sign up
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
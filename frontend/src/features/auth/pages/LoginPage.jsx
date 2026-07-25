import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { loginSchema } from '../validations/auth.schema.js';
import Input from '../../../shared/components/Input.jsx';
import Button from '../../../shared/components/Button.jsx';

function LoginPage() {
    const { login, isLoggingIn, loginError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const redirectTo = location.state?.from?.pathname || '/';

    async function onSubmit(values) {
        try {
            await login(values);
            navigate(redirectTo, { replace: true });
        } catch {
            // loginError from useAuth already reflects the failure; nothing further needed here
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-sm">
                <h1 className="mb-6 text-xl font-semibold text-gray-900">Log in</h1>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
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

                    {loginError && (
                        <p className="text-sm text-red-600" role="alert">
                            {loginError.message}
                        </p>
                    )}

                    <Button type="submit" isLoading={isLoggingIn} className="mt-2 w-full">
                        Log in
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
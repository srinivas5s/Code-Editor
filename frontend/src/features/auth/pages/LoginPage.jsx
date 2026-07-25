import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { loginSchema } from '../validations/auth.schema.js';
import Input from '../../../shared/components/Input.jsx';
import PasswordInput from '../../../shared/components/PasswordInput.jsx';
import Button from '../../../shared/components/Button.jsx';
import Card from '../../../shared/components/Card.jsx';

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
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-(--color-bg-base)">
      {/* Branding panel — hidden on mobile, split-screen on desktop */}
      <div className="relative hidden lg:flex overflow-hidden bg-(--color-bg-surface) border-r border-(--color-border-subtle) p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: 'var(--color-signal-glow)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'var(--color-brand-primary-muted)' }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between mx-auto w-full max-w-xl">
          <div className="flex items-center gap-2.5">
            <div
              role="img"
              aria-label="Signal logo"
              className="flex h-9 w-9 items-center justify-center rounded-(--radius-md) bg-(--color-brand-primary) text-(--color-text-on-brand) font-(--font-weight-bold)"
            >
              S
            </div>
            <span className="text-(length:--text-md) font-(--font-weight-semibold) text-(--color-text-primary)">
              Signal
            </span>
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <h1 className="text-(length:--text-3xl) font-(--font-weight-bold) tracking-(--letter-spacing-tight) text-(--color-text-primary)">
              Build together,
              <br />
              in real time.
            </h1>
            <p className="text-(length:--text-base) leading-(--line-height-relaxed) text-(--color-text-secondary)">
              Write, run, and ship code with your team — synced instantly,
              no matter where anyone is working from.
            </p>
          </div>

          <div className="flex items-center gap-2 text-(length:--text-xs) text-(--color-text-tertiary)">
            <span
              className="signal-pulse h-2 w-2 rounded-full"
              style={{ background: 'var(--color-signal)' }}
              aria-hidden="true"
            />
            Live collaboration, always in sync
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-card-enter">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div
              role="img"
              aria-label="Signal logo"
              className="flex h-8 w-8 items-center justify-center rounded-(--radius-md) bg-(--color-brand-primary) text-(--color-text-on-brand) font-(--font-weight-bold) text-(length:--text-sm)"
            >
              S
            </div>
            <span className="text-(length:--text-base) font-(--font-weight-semibold) text-(--color-text-primary)">
              Signal
            </span>
          </div>

          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-1.5">
              <h2 className="text-(length:--text-xl) font-(--font-weight-semibold) tracking-(--letter-spacing-tight) text-(--color-text-primary)">
                Welcome back
              </h2>
              <p className="text-(length:--text-sm) text-(--color-text-secondary)">
                Log in to continue to your workspace
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <PasswordInput
                id="password"
                label="Password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />

              {loginError && (
                <p
                  role="alert"
                  className="rounded-(--radius-md) bg-(--color-error-muted) px-3 py-2.5 text-(length:--text-sm) text-(--color-error)"
                >
                  {loginError.message}
                </p>
              )}

              <Button type="submit" isLoading={isLoggingIn} className="mt-1 w-full">
                Log in
              </Button>
            </form>

            <p className="mt-6 text-center text-(length:--text-sm) text-(--color-text-secondary)">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-(--font-weight-medium) text-(--color-brand-primary) hover:text-(--color-brand-primary-hover) transition-standard"
              >
                Sign up
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
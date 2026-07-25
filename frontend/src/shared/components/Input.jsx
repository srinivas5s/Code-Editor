import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, id, error, type = 'text', className = '', ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-(length:--text-sm) font-(--font-weight-medium) text-(--color-text-secondary)"
      >
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`rounded-(--radius-md) border bg-(--color-bg-surface) px-3.5 py-2.5 text-(length:--text-base) text-(--color-text-primary) placeholder:text-(--color-text-tertiary) outline-none transition-standard focus-visible:outline-none ${
          error
            ? 'border-(--color-error) focus:shadow-[0_0_0_3px_var(--color-error-muted)]'
            : 'border-(--color-border-default) focus:border-(--color-brand-primary) focus:shadow-(--shadow-glow-brand)'
        } ${className}`}
        {...rest}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1 text-(length:--text-xs) text-(--color-error)"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
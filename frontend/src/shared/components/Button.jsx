const VARIANT_STYLES = {
  primary:
    'bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] hover:bg-[var(--color-brand-primary-hover)] active:bg-[var(--color-brand-primary-active)] shadow-[var(--shadow-sm)]',
  secondary:
    'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]',
  danger:
    'bg-[var(--color-error)] text-[var(--color-text-on-brand)] hover:opacity-[var(--opacity-hover)]',
};

function Button({
  children,
  isLoading,
  disabled,
  variant = 'primary',
  className = '',
  ...rest
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-(--radius-md) px-4 py-2.5 text-(length:--text-sm) font-(--font-weight-medium) transition-standard focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled) ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default Button;
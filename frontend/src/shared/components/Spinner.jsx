function Spinner({ size = 20, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`animate-spin rounded-full border-2 border-(--color-border-default) border-t-(--color-brand-primary) ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default Spinner;
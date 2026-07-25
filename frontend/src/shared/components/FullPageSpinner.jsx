function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--color-bg-base)">
      <div
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-(--color-border-default) border-t-(--color-brand-primary)"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default FullPageSpinner;
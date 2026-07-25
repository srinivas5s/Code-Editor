function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      {icon && <div className="text-(--color-text-tertiary)">{icon}</div>}
      <h3 className="text-(length:--text-md) font-(--font-weight-semibold) text-(--color-text-primary)">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-(length:--text-sm) text-(--color-text-secondary)">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;
function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-(--radius-xl) border border-(--color-border-subtle) bg-(--color-bg-surface) shadow-(--shadow-lg) ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
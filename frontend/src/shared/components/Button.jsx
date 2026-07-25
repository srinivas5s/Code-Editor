function Button({ children, isLoading, disabled, className = '', ...rest }) {
    return (
        <button
            disabled={disabled || isLoading}
            className={`flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            {...rest}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
}

export default Button;
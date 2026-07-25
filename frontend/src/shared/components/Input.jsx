import { forwardRef } from 'react';

const Input = forwardRef(function Input(
    { label, id, error, type = 'text', ...rest },
    ref
) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                ref={ref}
                type={type}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-offset-1 ${error
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                {...rest}
            />
            {error && (
                <p id={`${id}-error`} className="text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
});

export default Input;
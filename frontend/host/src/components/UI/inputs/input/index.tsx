import React from 'react';

interface FormInputProps {
    label?: string;
    type: string;
    value: string | any;
    placeholder: string;
    error?: string;
    onChange: (value: any) => void;
    onBlur?: () => void;
    className?: string;
    required?: boolean;
    borderColor?: string;
    disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    type,
    value,
    placeholder,
    error,
    onChange,
    onBlur,
    className = '',
    borderColor = 'lightGray',
    disabled = false,
}) => {
    const borderClass = error ? 'border-red' : `border-${borderColor}`;

    return (
        <div className={'m-0 p-0 ' + className}>
            {label && (
                <label className="block text-sm font-bold text-black">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className={`block w-full p-2 outline-none border-2 ${borderClass} rounded-md text-black`}
                placeholder={placeholder}
                disabled={disabled ? true : undefined}
            />
            {error && <p className="text-red text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;

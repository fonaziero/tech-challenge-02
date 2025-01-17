import { useState } from "react";
import '../../../../styles/dropdown-select.module.css';

type Option = {
    value: string;
    label: string;
};

interface DropdownSelectProps {
    options: Option[];
    placeholder: string;
    color?: string;
    onChange: (selectedValue: string) => void;
}

export default function DropdownSelect({ options, placeholder, color = 'green', onChange }: DropdownSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const displayText = selectedOption || placeholder;

    const handleSelectOption = (option: Option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        onChange(option.value);
    };

    return (
        <div className="w-full max-w-xs sm:max-w-sm lg:w-[355px]">
            <div className="relative">
                <button
                    type="button"
                    className={`appearance-none w-full border rounded-md h-12 lg:h-[48px] px-3 text-darkBlue font-regular bg-white focus:outline-none flex items-center justify-between ${'custom-select-button'} border-${color}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="w-full text-left text-xs sm:text-sm lg:text-base">{displayText}</span>
                    <span
                        className={`${'custom-select-icon'}  ${isOpen ? 'rotate' : ''} ${'custom-select-triangle'} borderTop-${color}`}
                    ></span>
                </button>

                {isOpen && (
                    <ul className={`absolute z-0 w-full border border-${color} bg-white rounded-b-md border-t-0 -mt-2 shadow-md`}>
                        {options.map((option, index) => (
                            <li
                                key={option.value}
                                className={`py-2 px-3 cursor-pointer hover:bg-lightGreen hover:font-bold text-black flex items-center justify-center ${option.label === selectedOption ? 'bg-lightGreen font-bold' : ''
                                    } ${index === 0 ? 'h-[60px]' : ''}`}
                                style={{ height: index === 0 ? '60px' : '48px' }}
                                onClick={() => handleSelectOption(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

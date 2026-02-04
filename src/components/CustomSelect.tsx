import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  name,
  id,
  required = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        id={id}
        name={name}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left text-base font-medium rounded-lg border-2 
          transition-all duration-200 flex items-center justify-between
          ${disabled 
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
            : isOpen
              ? 'bg-white border-primary-500 ring-4 ring-primary-200 shadow-md'
              : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 shadow-sm'
          }
          ${!selectedOption && !disabled ? 'text-gray-400 italic' : 'text-gray-900'}
        `}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown 
          className={`h-5 w-5 ml-2 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180 text-primary-600' : 'text-gray-500'
          }`} 
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-1 max-h-64 overflow-auto">
          {placeholder && (
            <div
              onClick={() => handleSelect('')}
              className={`
                px-4 py-2.5 text-base cursor-pointer transition-colors flex items-center justify-between
                ${value === '' 
                  ? 'bg-primary-50 text-primary-700 font-semibold' 
                  : 'text-gray-400 italic hover:bg-gray-50'
                }
              `}
            >
              <span>{placeholder}</span>
              {value === '' && <Check className="h-5 w-5 text-primary-600 font-bold" />}
            </div>
          )}
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                px-4 py-2.5 text-base cursor-pointer transition-colors flex items-center justify-between
                ${value === option.value 
                  ? 'bg-primary-50 text-primary-700 font-semibold' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-primary-600'
                }
              `}
            >
              <span className="font-medium">{option.label}</span>
              {value === option.value && <Check className="h-5 w-5 text-primary-600 font-bold" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  counter?: {
    current: number;
    max: number;
  };
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  counter,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {counter && (
            <span className="ml-2 text-sm text-gray-500">
              ({counter.current}/{counter.max} items)
            </span>
          )}
        </div>
        <svg
          className={`h-5 w-5 transform text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Collapsible; 
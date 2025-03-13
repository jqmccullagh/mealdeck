import React from 'react';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm ${className}`}
    >
      <span className="text-gray-900">{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 rounded-full p-1 hover:bg-gray-200"
          aria-label={`Remove ${label}`}
        >
          <svg
            className="h-3 w-3 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip; 
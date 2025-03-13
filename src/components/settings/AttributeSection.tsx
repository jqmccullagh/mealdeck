import React, { useState } from 'react';
import Collapsible from '../ui/Collapsible';
import Chip from '../ui/Chip';
import Button from '../ui/Button';

interface AttributeSectionProps {
  title: string;
  items: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  maxItems?: number;
}

const AttributeSection: React.FC<AttributeSectionProps> = ({
  title,
  items,
  onAddItem,
  onRemoveItem,
  maxItems = 20,
}) => {
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() && items.length < maxItems) {
      onAddItem(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <Collapsible
      title={title}
      counter={{ current: items.length, max: maxItems }}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip
              key={item}
              label={item}
              onRemove={() => onRemoveItem(item)}
              className="mb-2"
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add new ${title.toLowerCase()}`}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={items.length >= maxItems}
          />
          <Button
            type="submit"
            variant="primary"
            size="small"
            disabled={!newItem.trim() || items.length >= maxItems}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Button>
        </form>
      </div>
    </Collapsible>
  );
};

export default AttributeSection; 
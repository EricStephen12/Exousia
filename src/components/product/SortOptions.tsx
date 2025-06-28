"use client";

import { useState } from "react";

type SortOption = "newest" | "price-low" | "price-high" | "name-asc" | "name-desc";

interface SortOptionsProps {
  onSortChange: (sortOption: SortOption) => void;
}

export default function SortOptions({ onSortChange }: SortOptionsProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("newest");
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A-Z" },
    { value: "name-desc", label: "Name: Z-A" },
  ];

  const handleSortChange = (option: SortOption) => {
    setCurrentSort(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-cream">Sort by:</span>
        <span className="text-gold font-semibold">
          {sortOptions.find(option => option.value === currentSort)?.label}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-gold/20 shadow-lg z-10 animate-fade-in">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gold/10 transition-colors ${
                currentSort === option.value ? "text-gold" : "text-cream"
              }`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
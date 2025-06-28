"use client";

import { useState } from "react";

interface FilterSidebarProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: [number, number];
    scriptureBooks: string[];
  }) => void;
  availableCategories?: string[];
  availableScriptureBooks?: string[];
}

export default function FilterSidebar({ 
  onFilterChange,
  availableCategories = [],
  availableScriptureBooks = []
}: FilterSidebarProps) {
  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedScriptureBooks, setSelectedScriptureBooks] = useState<string[]>([]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      // Update parent component with new filters
      onFilterChange({
        categories: newSelection,
        priceRange,
        scriptureBooks: selectedScriptureBooks
      });
      
      return newSelection;
    });
  };

  // Handle price range change
  const handlePriceChange = (value: number, index: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > priceRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < priceRange[0]) {
      newRange[0] = value;
    }
    
    setPriceRange(newRange);
    
    // Update parent component with new filters
    onFilterChange({
      categories: selectedCategories,
      priceRange: newRange,
      scriptureBooks: selectedScriptureBooks
    });
  };

  // Handle scripture book selection
  const handleScriptureBookChange = (book: string) => {
    setSelectedScriptureBooks(prev => {
      const newSelection = prev.includes(book)
        ? prev.filter(b => b !== book)
        : [...prev, book];
      
      // Update parent component with new filters
      onFilterChange({
        categories: selectedCategories,
        priceRange,
        scriptureBooks: newSelection
      });
      
      return newSelection;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSelectedScriptureBooks([]);
    
    // Update parent component with reset filters
    onFilterChange({
      categories: [],
      priceRange: [0, 200],
      scriptureBooks: []
    });
  };

  return (
    <div className="bg-black border-r border-gold/20 p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-clash-display text-cream">FILTER</h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-gold underline"
        >
          Reset All
        </button>
      </div>
      
      {/* Categories */}
      <div>
        <h3 className="text-gold mb-3 font-semibold">CATEGORIES</h3>
        <div className="space-y-2">
          {availableCategories.length > 0 ? (
            availableCategories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 accent-gold bg-transparent border-gold/50 mr-2"
                />
                <label 
                  htmlFor={`category-${category}`}
                  className="text-cream cursor-pointer hover:text-gold transition-colors"
                >
                  {category}
                </label>
              </div>
            ))
          ) : (
            <p className="text-cream/50 text-sm">No categories available</p>
          )}
        </div>
      </div>
      
      {/* Price Range */}
      <div>
        <h3 className="text-gold mb-3 font-semibold">PRICE RANGE</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-cream">${priceRange[0]}</span>
            <span className="text-cream">${priceRange[1]}</span>
          </div>
          
          <div className="flex space-x-4">
            <input
              type="range"
              min={0}
              max={200}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), 0)}
              className="w-full accent-gold"
            />
            <input
              type="range"
              min={0}
              max={200}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), 1)}
              className="w-full accent-gold"
            />
          </div>
        </div>
      </div>
      
      {/* Scripture References */}
      <div>
        <h3 className="text-gold mb-3 font-semibold">SCRIPTURE</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {availableScriptureBooks.length > 0 ? (
            availableScriptureBooks.map(book => (
              <div key={book} className="flex items-center">
                <input
                  type="checkbox"
                  id={`book-${book}`}
                  checked={selectedScriptureBooks.includes(book)}
                  onChange={() => handleScriptureBookChange(book)}
                  className="w-4 h-4 accent-gold bg-transparent border-gold/50 mr-2"
                />
                <label 
                  htmlFor={`book-${book}`}
                  className="text-cream cursor-pointer hover:text-gold transition-colors"
                >
                  {book}
                </label>
              </div>
            ))
          ) : (
            <p className="text-cream/50 text-sm">No scripture references available</p>
          )}
        </div>
      </div>
      
      {/* Apply Filters Button (Mobile) */}
      <div className="md:hidden">
        <button className="w-full bg-gold text-black py-2 font-semibold">
          APPLY FILTERS
        </button>
      </div>
    </div>
  );
} 
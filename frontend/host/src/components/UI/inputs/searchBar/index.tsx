import React, { useState } from 'react';
import FormInput from '../input/index'; 

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Digite para buscar...',
  onSearch,
  debounceTime = 300,
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);

    // Debounce para evitar chamadas frequentes
    if (debounceTime) {
      clearTimeout((window as any)._searchTimeout);
      (window as any)._searchTimeout = setTimeout(() => {
        onSearch(value);
      }, debounceTime);
    } else {
      onSearch(value);
    }
  };

  return (
    <FormInput
      type="text"
      value={query}
      placeholder={placeholder}
      onChange={handleChange}
      className="mb-4"
    />
  );
};

export default SearchBar;

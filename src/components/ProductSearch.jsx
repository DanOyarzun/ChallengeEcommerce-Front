import React from 'react';
import Sidebar from "./Sidebar";

const ProductSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  handleCategoryChange 
}) => {
  return (
    <div className="md:w-1/4 p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </form>
      <Sidebar onSelectCategory={handleCategoryChange} />
    </div>
  );
};

export default ProductSearch;

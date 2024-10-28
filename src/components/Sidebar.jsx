import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

const Sidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => setCategories((await getCategories()).categorias))();
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">Categorías</h4>
      <ul className="list-none">
        {categories.map((category, index) => (
          <li
            key={index}
            className="p-2 hover:bg-blue-100 rounded cursor-pointer transition duration-200"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

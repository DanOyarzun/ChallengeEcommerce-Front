import React from "react";

const Popup = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
};

export default Popup;
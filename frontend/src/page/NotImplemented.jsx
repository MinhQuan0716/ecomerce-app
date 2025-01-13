import React from 'react'
import { ShopContext } from '../context/ShopContext';
const NotImplemented = () => {
    const {navigate} = React.useContext(ShopContext);   
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Icon/Illustration */}
            <div className="mb-8">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
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
            </div>
    
            {/* Text Content */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Under Construction
            </h1>
            <p className="text-gray-600 mb-8">
              This feature is currently not implemented. We're working hard to bring this functionality to you soon!
            </p>
    
            {/* Button */}
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      );
}

export default NotImplemented
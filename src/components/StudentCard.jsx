import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl font-bold">
            {student.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{student.name}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              student.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {student.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm">Roll: {student.rollNumber}</p>
          <p className="text-gray-600 text-sm truncate">Email: {student.email}</p>
          <p className="text-gray-600 text-sm">Course: {student.course}</p>
          <p className="text-gray-600 text-sm">Phone: {student.phone}</p>
          {student.address && (
            <p className="text-gray-600 text-sm truncate">📍 {student.address}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(student)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
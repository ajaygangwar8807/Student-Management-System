import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Attendance = () => {
  const { students, attendance, updateAttendance, courses } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('All Courses');

  // Filter students by selected course
  const filteredStudents = selectedCourse === 'All Courses' 
    ? students 
    : students.filter(student => student.course === selectedCourse);

  const [currentAttendance, setCurrentAttendance] = useState(
    attendance[selectedDate] || filteredStudents.reduce((acc, student) => {
      acc[student.id] = 'present';
      return acc;
    }, {})
  );

  const handleAttendanceChange = (studentId, status) => {
    setCurrentAttendance({
      ...currentAttendance,
      [studentId]: status
    });
  };

  const handleSubmit = () => {
    Object.keys(currentAttendance).forEach(studentId => {
      updateAttendance(selectedDate, parseInt(studentId), currentAttendance[studentId]);
    });
    alert('Attendance saved successfully!');
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = filteredStudents.filter(student => currentAttendance[student.id] === 'present').length;
    const absent = filteredStudents.filter(student => currentAttendance[student.id] === 'absent').length;

    return { total, present, absent };
  };

  const stats = getAttendanceStats();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="mt-2 text-gray-600">Mark student attendance by course</p>
      </div>

      {/* Date and Course Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setCurrentAttendance(
                  attendance[e.target.value] || filteredStudents.reduce((acc, student) => {
                    acc[student.id] = 'present';
                    return acc;
                  }, {})
                );
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                // Reset attendance when course changes
                const newFilteredStudents = e.target.value === 'All Courses' 
                  ? students 
                  : students.filter(student => student.course === e.target.value);
                setCurrentAttendance(
                  attendance[selectedDate] || newFilteredStudents.reduce((acc, student) => {
                    acc[student.id] = 'present';
                    return acc;
                  }, {})
                );
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All Courses">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Save Attendance
            </button>
          </div>
        </div>
        
        {selectedCourse !== 'All Courses' && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              📚 Taking attendance for: <span className="font-semibold">{selectedCourse}</span>
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3 mr-4">
              <span className="text-white text-xl">👥</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3 mr-4">
              <span className="text-white text-xl">✅</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">{stats.present}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-500 rounded-lg p-3 mr-4">
              <span className="text-white text-xl">❌</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Student Attendance 
            {selectedCourse !== 'All Courses' && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({selectedCourse})
              </span>
            )}
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredStudents.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <div className="text-gray-400 text-4xl mb-2">👥</div>
              <p className="text-gray-500">No students found for the selected course.</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
            <div key={student.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-medium">
                    {student.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.course}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAttendanceChange(student.id, 'present')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentAttendance[student.id] === 'present'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => handleAttendanceChange(student.id, 'absent')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentAttendance[student.id] === 'absent'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Absent
                </button>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
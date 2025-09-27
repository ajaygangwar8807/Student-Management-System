import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { students, courses, marks, getStats } = useData();
  const stats = getStats();

  const dashboardStats = [
    { title: 'Total Students', value: stats.totalStudents, icon: '👥', color: 'bg-blue-500', link: '/students' },
    { title: 'Total Courses', value: stats.totalCourses, icon: '📚', color: 'bg-purple-500', link: '/courses' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to the 3</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <Link key={index} to={stat.link} className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <span className="text-white text-2xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Students</h3>
          <div className="space-y-3">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-medium text-sm">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.course}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  student.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/students" className="block mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Students →
          </Link> npm start
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Marks</h3>
          <div className="space-y-3">
            {marks.slice(-5).map((mark) => (
              <div key={mark.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{mark.studentName}</p>
                  <p className="text-sm text-gray-600">{mark.subject} - {mark.examType}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{mark.marks}/{mark.maxMarks}</p>
                  <p className={`text-xs font-medium ${
                    (mark.marks/mark.maxMarks)*100 >= 80 ? 'text-green-600' : 
                    (mark.marks/mark.maxMarks)*100 >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {((mark.marks/mark.maxMarks)*100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/marks" className="block mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Marks →
          </Link>
        </div>
      </div>

      {/* Course Overview */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{course.name}</h4>
              <p className="text-sm text-gray-600 mt-1">Code: {course.code}</p>
              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              <p className="text-sm font-medium text-blue-600 mt-2">{course.students} Students</p>
            </div>
          ))}
        </div>
        <Link to="/courses" className="block mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
          Manage Courses →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
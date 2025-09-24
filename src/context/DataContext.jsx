import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Students data
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      email: 'rahul.sharma@email.com', 
      course: 'Computer Science', 
      phone: '+91-9876543210',
      rollNumber: 'CS001',
      dateOfBirth: '2002-05-15',
      address: 'Mumbai, Maharashtra',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      email: 'priya.patel@email.com', 
      course: 'Information Technology', 
      phone: '+91-9876543211',
      rollNumber: 'IT002',
      dateOfBirth: '2001-08-22',
      address: 'Ahmedabad, Gujarat',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Arjun Singh', 
      email: 'arjun.singh@email.com', 
      course: 'Electronics', 
      phone: '+91-9876543212',
      rollNumber: 'EC003',
      dateOfBirth: '2002-12-10',
      address: 'Delhi, India',
      status: 'Active'
    },
    { 
      id: 4, 
      name: 'Sneha Gupta', 
      email: 'sneha.gupta@email.com', 
      course: 'Mechanical Engineering', 
      phone: '+91-9876543213',
      rollNumber: 'ME004',
      dateOfBirth: '2001-03-18',
      address: 'Pune, Maharashtra',
      status: 'Inactive'
    },
    { 
      id: 5, 
      name: 'Vikram Kumar', 
      email: 'vikram.kumar@email.com', 
      course: 'Computer Science', 
      phone: '+91-9876543214',
      rollNumber: 'CS005',
      dateOfBirth: '2002-07-25',
      address: 'Bangalore, Karnataka',
      status: 'Active'
    }
  ]);

  // Courses data
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'Computer Science', 
      code: 'CS', 
      instructor: 'Dr. Rajesh Kumar', 
      students: 45,
      duration: '4 Years',
      fees: '₹2,50,000'
    },
    { 
      id: 2, 
      name: 'Information Technology', 
      code: 'IT', 
      instructor: 'Prof. Sunita Sharma', 
      students: 38,
      duration: '4 Years',
      fees: '₹2,30,000'
    },
    { 
      id: 3, 
      name: 'Electronics Engineering', 
      code: 'EC', 
      instructor: 'Dr. Amit Verma', 
      students: 32,
      duration: '4 Years',
      fees: '₹2,40,000'
    },
    { 
      id: 4, 
      name: 'Mechanical Engineering', 
      code: 'ME', 
      instructor: 'Prof. Ravi Gupta', 
      students: 28,
      duration: '4 Years',
      fees: '₹2,20,000'
    }
  ]);

  // Attendance data
  const [attendance, setAttendance] = useState({
    '2024-01-15': {
      1: 'present',
      2: 'present', 
      3: 'absent',
      4: 'late',
      5: 'present'
    },
    '2024-01-16': {
      1: 'present',
      2: 'late',
      3: 'present',
      4: 'absent',
      5: 'present'
    }
  });

  // Marks data
  const [marks, setMarks] = useState([
    { 
      id: 1, 
      studentId: 1,
      studentName: 'Rahul Sharma', 
      course: 'Computer Science', 
      subject: 'Data Structures', 
      marks: 85, 
      maxMarks: 100,
      examType: 'Mid-term',
      date: '2024-01-10'
    },
    { 
      id: 2, 
      studentId: 2,
      studentName: 'Priya Patel', 
      course: 'Information Technology', 
      subject: 'Database Management', 
      marks: 92, 
      maxMarks: 100,
      examType: 'Final',
      date: '2024-01-12'
    },
    { 
      id: 3, 
      studentId: 3,
      studentName: 'Arjun Singh', 
      course: 'Electronics', 
      subject: 'Digital Electronics', 
      marks: 78, 
      maxMarks: 100,
      examType: 'Mid-term',
      date: '2024-01-11'
    },
    { 
      id: 4, 
      studentId: 1,
      studentName: 'Rahul Sharma', 
      course: 'Computer Science', 
      subject: 'Algorithms', 
      marks: 88, 
      maxMarks: 100,
      examType: 'Final',
      date: '2024-01-13'
    }
  ]);

  // CRUD operations for students
  const addStudent = (student) => {
    const newId = Math.max(...students.map(s => s.id), 0) + 1;
    const newStudent = { ...student, id: newId, status: 'Active' };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...updatedStudent, id } : student
    ));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    // Also remove related marks and attendance
    setMarks(prev => prev.filter(mark => mark.studentId !== id));
  };

  // CRUD operations for courses
  const addCourse = (course) => {
    const newId = Math.max(...courses.map(c => c.id), 0) + 1;
    const newCourse = { ...course, id: newId };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const updateCourse = (id, updatedCourse) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...updatedCourse, id } : course
    ));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  // CRUD operations for marks
  const addMark = (mark) => {
    const newId = Math.max(...marks.map(m => m.id), 0) + 1;
    const newMark = { ...mark, id: newId };
    setMarks(prev => [...prev, newMark]);
    return newMark;
  };

  const updateMark = (id, updatedMark) => {
    setMarks(prev => prev.map(mark => 
      mark.id === id ? { ...updatedMark, id } : mark
    ));
  };

  const deleteMark = (id) => {
    setMarks(prev => prev.filter(mark => mark.id !== id));
  };

  // Attendance operations
  const updateAttendance = (date, studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [studentId]: status
      }
    }));
  };

  // Statistics
  const getStats = () => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Active').length;
    const totalCourses = courses.length;
    
    // Calculate average marks
    const avgMarks = marks.length > 0 
      ? (marks.reduce((sum, mark) => sum + (mark.marks / mark.maxMarks * 100), 0) / marks.length).toFixed(1)
      : 0;

    // Today's attendance (using latest date)
    const latestDate = Object.keys(attendance).sort().pop();
    const todayAttendance = latestDate ? attendance[latestDate] : {};
    const presentToday = Object.values(todayAttendance).filter(status => status === 'present').length;

    return {
      totalStudents,
      activeStudents,
      totalCourses,
      avgMarks,
      presentToday,
      attendanceRate: totalStudents > 0 ? ((presentToday / totalStudents) * 100).toFixed(1) : 0
    };
  };

  const value = {
    // Data
    students,
    courses,
    marks,
    attendance,
    
    // Student operations
    addStudent,
    updateStudent,
    deleteStudent,
    
    // Course operations
    addCourse,
    updateCourse,
    deleteCourse,
    
    // Marks operations
    addMark,
    updateMark,
    deleteMark,
    
    // Attendance operations
    updateAttendance,
    
    // Statistics
    getStats
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
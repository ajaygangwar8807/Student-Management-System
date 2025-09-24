# Student Management System

A comprehensive web-based Student Management System built with React.js, JavaScript, and Tailwind CSS. This system provides a complete solution for managing students, courses, attendance, and marks in educational institutions.

## 🚀 Features

### 📊 Dashboard
- Overview of total students and courses
- Recent student registrations
- Latest marks entries
- Course overview with instructor details

### 👥 Student Management
- Add, edit, and delete student records
- Comprehensive student information (Name, Email, Course, Phone, Roll Number, Date of Birth, Address)
- Card and table view options
- Student status tracking (Active/Inactive)
- Search and filter functionality

### 📚 Course Management
- Complete course information management
- Course details: Name, Code, Instructor, Duration, Fees
- Student enrollment tracking
- Easy course addition and modification

### ✅ Attendance System
- **Course-wise attendance** - Take attendance separately for each course
- Date-based attendance tracking
- Present/Absent marking system
- Real-time attendance statistics
- Course filtering for organized attendance management

### 📝 Marks Management
- Student marks and grades tracking
- Subject-wise marks entry
- Automatic grade calculation (A+, A, B, C, D, F)
- Performance statistics (Total Records, Highest Marks, Pass Rate)
- Percentage calculation

## 🛠️ Technology Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **State Management**: React Context API
- **Icons**: Emoji-based icons
- **Build Tool**: Create React App

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Login Credentials

Use the following credentials to access the system:

- **Username**: `admin`
- **Password**: `admin`

## 📁 Project Structure

```
student-management-system/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Sidebar.jsx         # Side navigation menu
│   │   ├── StudentCard.jsx     # Student card component
│   │   └── Table.jsx           # Reusable table component
│   ├── context/
│   │   └── DataContext.jsx     # Global state management
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Students.jsx        # Student management
│   │   ├── Courses.jsx         # Course management
│   │   ├── Attendance.jsx      # Attendance system
│   │   └── Marks.jsx           # Marks management
│   ├── App.jsx                 # Main app component
│   ├── index.js               # App entry point
│   └── index.css              # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 Key Features Explained

### Course-wise Attendance
- Select specific courses (Computer Science, Information Technology, etc.)
- Take attendance separately for each course
- Filter students by course for organized management
- Date-based attendance tracking

### Student Management
- **Card View**: Visual cards showing student information
- **Table View**: Tabular format for quick data scanning
- **Comprehensive Forms**: All necessary student details
- **Status Tracking**: Active/Inactive student status

### Marks System
- **Grade Calculation**: Automatic grade assignment based on percentage
- **Statistics**: Real-time calculation of performance metrics
- **Subject-wise Tracking**: Organize marks by subjects and exam types

## 📱 Responsive Design

The system is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 UI/UX Features

- **Clean Interface**: Modern and intuitive design
- **Color-coded Status**: Visual indicators for different states
- **Interactive Elements**: Hover effects and smooth transitions
- **Modal Forms**: Clean popup forms for data entry
- **Empty States**: Helpful messages when no data is available

## 🔧 Customization

### Adding New Courses
1. Navigate to the Courses page
2. Click "Add Course"
3. Fill in course details (Name, Code, Instructor, Duration, Fees)
4. Save the course

### Managing Students
1. Go to Students page
2. Use "Add Student" to register new students
3. Switch between Card and Table views
4. Edit or delete students as needed

### Taking Attendance
1. Open Attendance page
2. Select the date
3. Choose specific course or "All Courses"
4. Mark students as Present or Absent
5. Save attendance

## 📊 Sample Data

The system comes with pre-populated sample data including:
- 5 sample students with Indian names and details
- 4 courses (Computer Science, IT, Electronics, Mechanical)
- Sample attendance records
- Sample marks entries

## 🚀 Deployment

To build the project for production:

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Data is stored in local state (not persistent across browser sessions)
- No backend integration (frontend-only application)
- No user authentication beyond simple login

## 🔮 Future Enhancements

- Backend integration with database
- Real user authentication and authorization
- Email notifications for attendance/marks
- Report generation (PDF/Excel)
- Parent portal for viewing student progress
- Mobile app version
- Advanced analytics and charts

## 📞 Support

For support or questions, please create an issue in the repository or contact the development team.

---

**Made with ❤️ for educational institutions**
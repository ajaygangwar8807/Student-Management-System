import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Table from '../components/Table';

const Marks = () => {
    const { marks, students, addMark, updateMark, deleteMark } = useData();

    const [showModal, setShowModal] = useState(false);
    const [editingMark, setEditingMark] = useState(null);
    const [formData, setFormData] = useState({
        studentId: '',
        studentName: '',
        course: '',
        subject: '',
        marks: '',
        maxMarks: 100,
        examType: 'Mid-term',
        date: new Date().toISOString().split('T')[0]
    });

    const handleAdd = () => {
        setEditingMark(null);
        setFormData({
            studentId: '',
            studentName: '',
            course: '',
            subject: '',
            marks: '',
            maxMarks: 100,
            examType: 'Mid-term',
            date: new Date().toISOString().split('T')[0]
        });
        setShowModal(true);
    };

    const handleEdit = (mark) => {
        setEditingMark(mark);
        setFormData(mark);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this mark?')) {
            deleteMark(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMark) {
            updateMark(editingMark.id, formData);
        } else {
            addMark(formData);
        }
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const getGrade = (marks, maxMarks) => {
        const percentage = (marks / maxMarks) * 100;
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'F';
    };

    const columns = [
        { header: 'Student Name', key: 'studentName' },
        { header: 'Course', key: 'course' },
        { header: 'Subject', key: 'subject' },
        { header: 'Marks', key: 'marks' },
        { header: 'Max Marks', key: 'maxMarks' },
        {
            header: 'Grade',
            key: 'grade',
            render: (row) => getGrade(row.marks, row.maxMarks)
        },
        {
            header: 'Percentage',
            key: 'percentage',
            render: (row) => `${((row.marks / row.maxMarks) * 100).toFixed(1)}%`
        }
    ];

    // Enhanced table data with calculated fields
    const enhancedMarks = marks.map(mark => ({
        ...mark,
        grade: getGrade(mark.marks, mark.maxMarks),
        percentage: `${((mark.marks / mark.maxMarks) * 100).toFixed(1)}%`
    }));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Marks</h1>
                    <p className="mt-2 text-gray-600">Manage student marks and grades</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    Add Marks
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                        <div className="bg-blue-500 rounded-lg p-3 mr-4">
                            <span className="text-white text-xl">📊</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Records</p>
                            <p className="text-2xl font-bold text-gray-900">{marks.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                        <div className="bg-yellow-500 rounded-lg p-3 mr-4">
                            <span className="text-white text-xl">🏆</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Highest Marks</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {marks.length > 0 ? Math.max(...marks.map(mark => mark.marks)) : 0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                        <div className="bg-purple-500 rounded-lg p-3 mr-4">
                            <span className="text-white text-xl">�</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {marks.length > 0 ?
                                    `${((marks.filter(mark => (mark.marks / mark.maxMarks) * 100 >= 50).length / marks.length) * 100).toFixed(1)}%`
                                    : '0%'
                                }
                            </p>
                        </div>                      
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <Table
                    columns={columns}
                    data={enhancedMarks}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingMark ? 'Edit Marks' : 'Add New Marks'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Student Name</label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        required
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course</label>
                                    <input
                                        type="text"
                                        name="course"
                                        required
                                        value={formData.course}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Marks Obtained</label>
                                    <input
                                        type="number"
                                        name="marks"
                                        required
                                        min="0"
                                        value={formData.marks}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Maximum Marks</label>
                                    <input
                                        type="number"
                                        name="maxMarks"
                                        required
                                        min="1"
                                        value={formData.maxMarks}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex space-x-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                                    >
                                        {editingMark ? 'Update' : 'Add'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marks;
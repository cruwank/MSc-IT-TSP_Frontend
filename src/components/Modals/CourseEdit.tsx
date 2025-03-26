import React, { useEffect, useState } from "react";

interface CourseEditModalProps {
    course: any;
    allSubjects: any[];
    onClose: () => void;
    onSave: (updatedCourse: any) => void;
}

const CourseEditModal: React.FC<CourseEditModalProps> = ({ course, allSubjects, onClose, onSave }) => {
    const [courseName, setCourseName] = useState(course.course_name);
    const [description, setDescription] = useState(course.description);
    const [duration, setDuration] = useState(course.duration);
    const [selectedSubjects, setSelectedSubjects] = useState(course.courseSubjects.map(cs => cs.subject.id));

    // Handle subject selection
    const handleSubjectChange = (subjectId: number) => {
        setSelectedSubjects(prev =>
            prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
        );
    };

    // Save updated course
    const handleSave = () => {
        const updatedCourse = {
            course_name: courseName,
            description,
            duration,
            subjectIdList: selectedSubjects,
        };
        onSave(updatedCourse);
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl border border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Edit Course</h2>

                <label className="block font-semibold mt-2">Course Name:</label>
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                />

                <label className="block font-semibold mt-2">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                />

                <label className="block font-semibold mt-2">Duration:</label>
                <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                />

                <label className="block font-semibold mt-2">Subjects:</label>
                <div className="border p-2 rounded max-h-40 overflow-y-auto">

                    {allSubjects?.map(subject => (
                        <label key={subject.id} className="flex items-center gap-2 py-1">
                            <input
                                type="checkbox"
                                checked={selectedSubjects.includes(subject.id)}
                                onChange={() => handleSubjectChange(subject.id)}
                            />
                            {subject.subject_name}
                        </label>
                    ))}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseEditModal;

import React from "react";

interface CourseViewModalProps {
    course: any;
    onClose: () => void;
}

const CourseViewModal: React.FC<CourseViewModalProps> = ({ course, onClose }) => {
    if (!course) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl border border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                <p><strong>Name:</strong> {course.course_name}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Duration:</strong> {course.duration}</p>

                {course.courseSubjects.length > 0 && (
                    <>
                        <h3 className="mt-4 font-semibold">Subjects & Teachers:</h3>
                        <div className="max-h-40 overflow-y-auto border rounded p-2">
                            {course.courseSubjects.map(({ subject }) => (
                                <div key={subject.id} className="border-b py-2">
                                    <p><strong>Subject:</strong> {subject.subject_name}</p>
                                    <p className="text-gray-600">{subject.description}</p>
                                    <p><strong>Teacher:</strong> {subject.teacher.first_name} {subject.teacher.last_name}</p>
                                    <p><strong>Email:</strong> {subject.teacher.email}</p>
                                    <p><strong>Phone:</strong> {subject.teacher.phone_number}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CourseViewModal;

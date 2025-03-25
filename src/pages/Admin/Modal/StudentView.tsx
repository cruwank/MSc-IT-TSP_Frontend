import React from "react";

interface Course {
    course_name: string;
    description: string;
    duration: string;
}

interface Batch {
    name: string;
    start_date: string;
    end_date: string;
    course: Course;
}

interface Enrolment {
    enrolment_date: string;
    batch: Batch;
}

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    status: string;
    phone_number: string;
    address: string;
    email: string;
    otp_code: string;
    enrolments: Enrolment[];
}

interface ModalProps {
    student: Student;
    onClose: () => void;
}

const StudentModal: React.FC<ModalProps> = ({ student, onClose }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl border border-[var(--primary-border-color)]">
                <h2 className="text-xl font-semibold mb-4">Student Details</h2>
                <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
                <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Status:</strong> {student.status}</p>
                <p><strong>Phone:</strong> {student.phone_number}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Email:</strong> {student.email}</p>
                {/*<p><strong>OTP Code:</strong> {student.otp_code}</p>*/}

                {student.enrolments.length > 0 && (
                    <>
                        <h3 className="mt-4 font-semibold">Enrolments:</h3>
                        <div className="max-h-40 overflow-y-auto border rounded p-2">
                            {student.enrolments.map((enrolment) => (
                                <div key={enrolment.id} className="border-b py-2">
                                    <p><strong>Enrolment Date:</strong> {enrolment.enrolment_date}</p>
                                    <p><strong>Batch:</strong> {enrolment.batch.name} ({enrolment.batch.start_date} - {enrolment.batch.end_date})</p>
                                    <p><strong>Course:</strong> {enrolment.batch.course.course_name}</p>
                                    <p><strong>Duration:</strong> {enrolment.batch.course.duration}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Close
                </button>
            </div>
        </div>
    );
};

export default StudentModal;

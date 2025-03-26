import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { request } from "../../lib/apiManagerAdmin";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

interface EditStudentModalProps {
    student: any;
    onClose: () => void;
    onSuccess: () => void;
}

export function EditStudentModal({ student, onClose, onSuccess }: EditStudentModalProps) {
    console.log(student)
    const [formData, setFormData] = useState(student);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await request({
                method: "put",
                path: `/students/${student.id}`,
                requestBody: formData,
            });
            setLoading(false);
            onClose();
            onSuccess();
        } catch (error) {
            setLoading(false);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl border border-gray-300">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Student</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input id="date_of_birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} required />
                        </div>
                        <div className="">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                            >
                                <SelectTrigger className="border border-[var(--primary-border-color)] rounded-lg p-3">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Male</SelectItem>
                                    <SelectItem value="F">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                            {loading ? "Updating..." : "Update Student"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

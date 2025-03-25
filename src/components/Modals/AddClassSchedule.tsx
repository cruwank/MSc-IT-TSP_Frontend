import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../../components/ui/select";
import { request } from "../../lib/apiManagerAdmin";

interface AddClassScheduleModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AddClassScheduleModal({ onClose, onSuccess }: AddClassScheduleModalProps) {
  const [formData, setFormData] = useState({
    courseId: "",
    subjectId: "",
    startTime: "",
    endTime: "",
    classDate: ""
  });
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [subjectList, setSubjectList] =  useState<any | null>(null);
  const [selectedSubject, setSelectedSubject] =  useState<any | null>(null);
  const [batchList, setBatchList] =  useState<any | null>(null);
  const [selectedBatch, setSelectedBatch] =  useState<any | null>(null);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const response = await request({
      //   method: "post",
      //   path: "/students/filter",
      //   requestBody: {
      //     subjectId: selectedSubject,
      //     batchId: selectedBatch,
      //     class_date: formData.classDate,
      //     start_time: formData.startTime,
      //     end_time: formData.endTime
      //   },
      // });
      console.log(formData);
      // const data = response.data;
      // console.log(data);
      // setStudentList(data.data)

    } catch (error) {
      if (error instanceof Error) {
        alert("An error occurred. Please username or password and try again");
      }
    }
  };

  useEffect(() => {
    getSubjects();
    getBatches()
  }, []);

  useEffect(() => {
   console.log('selectedBatch',selectedBatch)
  }, [selectedBatch]);

  const getSubjects = async () => {
    try {
      const response = await request({
        method: "get",
        path: "/subjects",
        requestBody: {
        },
      });
      console.log(response);
      const data = response.data;
      console.log(data);
      setSubjectList(data)

    } catch (error) {
      if (error instanceof Error) {
        alert("An error occurred. Please username or password and try again");
      }
    }
  };
  const getBatches = async () => {
    try {
      const response = await request({
        method: "get",
        path: "/batches",
        requestBody: {
        },
      });
      console.log(response);
      const data = response.data;
      console.log(data);
      setBatchList(data)

    } catch (error) {
      if (error instanceof Error) {
        alert("An error occurred. Please username or password and try again");
      }
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl border border-[var(--primary-border-color)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Class Schedule</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              {/*<h3 className="text-lg font-medium mb-2  text-left">Course Filter</h3>*/}
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="border border-[var(--primary-border-color)] rounded-lg p-3 elevation-1 hover:elevation-2 transition-all duration-300">
                  {selectedBatch && batchList?.length > 0
                      ? subjectList.find(b => b.id == selectedSubject)?.subject_name || "Select Module"
                      : "Select Module"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={`0-${Math.random()}`}  value={null}>All Modules</SelectItem>
                  {subjectList?.map((module) => (
                      <SelectItem key={`${module.id}-${Math.random()}`} value={module.id}>{module.subject_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              {/*<h3 className="text-lg font-medium mb-2  text-left">Course Filter</h3>*/}
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="border border-[var(--primary-border-color)] rounded-lg p-3 elevation-1 hover:elevation-2 transition-all duration-300">
                  {selectedBatch && batchList?.length > 0
                      ? batchList.find(b => b.id == selectedBatch)?.name || "Select Batch"
                      : "Select Batch"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={`0-${Math.random()}`} value={null}>All Batches</SelectItem>
                  {batchList?.map(batch => (
                      <SelectItem key={`${batch.id}-${Math.random()}`} value={batch.id}>{batch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Time</Label>
              <Input
                id="startDate"
                type="time"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Time</Label>
              <Input
                id="endDate"
                type="time"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="classTime">Class Date</Label>
            <Input
              id="classTime"
              type="date"
              value={formData.classTime}
              onChange={(e) => setFormData({ ...formData, classTime: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--accent)] hover:bg-[var(--accent-dark)]"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Schedule"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

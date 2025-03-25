import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function Confirmation() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password successfully updated!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-sm md:max-w-md shadow-xl rounded-2xl p-6 md:p-8 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold text-gray-900">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid gap-2">
              <label className="text-gray-700 font-medium text-sm">New Password</label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 text-md border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            
            <div className="grid gap-2">
              <label className="text-gray-700 font-medium text-sm">Re-Enter Password</label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 text-md border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            
            <Button
              type="submit"
              className="w-full h-12 text-md bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300"
            >
              Confirm Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

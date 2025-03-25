import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
   
    alert(`Password reset link sent to: ${email}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-2">
      <Card className="w-full h-full max-w-sm md:max-w-md lg:max-w-lg shadow-xl rounded-2xl  md:p-8 bg-white ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Reset Password
          </CardTitle>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            Enter your email to receive a password reset link.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-3">
              <label className="text-gray-700 font-medium text-sm">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-md border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-md bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300"
            >
              Send Reset Link
            </Button>

            <div className="text-center">
              <a href="/" className="text-sm md:text-base text-blue-600 hover:text-blue-800 underline transition">
                Back to Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

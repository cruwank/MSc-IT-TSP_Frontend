import React from "react";
import { LoginForm } from "../../components/login-form";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <LoginForm 
      portalType="Student"/>
    </div>
  );
}

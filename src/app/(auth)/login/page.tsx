import LoginForm from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";
import React from "react";

const LoginPage = async () => {
  await requireUnAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

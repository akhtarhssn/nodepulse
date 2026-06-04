import RegisterFrom from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";

const RegisterPage = async () => {
  await requireUnAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegisterFrom />
    </div>
  );
};

export default RegisterPage;

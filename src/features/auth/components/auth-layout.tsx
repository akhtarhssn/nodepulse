import React from "react";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src="/logos/logo.svg"
            width={40}
            height={40}
            alt="NodePulse Logo"
          />
          NodePulse
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

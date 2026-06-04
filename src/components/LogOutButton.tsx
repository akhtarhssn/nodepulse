"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LogOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    });
  };

  return (
    <Button onClick={() => handleLogout()} disabled={isPending}>
      {isPending ? "Logging Out..." : "Log Out"}{" "}
    </Button>
  );
};

export default LogOutButton;

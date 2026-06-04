"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// import { authClient } from "@/lib/auth-client";

import { GitHubIcon, GoogleIcon } from "@/components/icons";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Successfully signed in!");
          router.push("/");
        },
        onError: (context) => {
          toast.error(
            context.error.message || "Failed to sign in. Please try again.",
          );
        },
      },
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="w-full max-w-125 mx-auto flex flex-col justify-center min-h-[80vh] px-4 py-12 antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Card className="px-5">
        {/* Apple Header Typographic Hierarchy */}
        <CardHeader className="space-y-1.5 text-center pt-8">
          <CardTitle className="text-[32px] font-semibold tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 leading-tight">
            Sign In
          </CardTitle>
          <CardDescription className="text-[15px] text-zinc-500 dark:text-zinc-400 font-normal tracking-tight max-w-70 mx-auto">
            Use your account credentials to access your workspace.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Inputs Group Container */}
              <div className="space-y-3">
                {/* Email Field */}
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={!!fieldState.error}
                      className="space-y-1"
                    >
                      <FieldLabel className="text-[12px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500 px-1">
                        Email Address
                      </FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        disabled={isPending}
                        aria-invalid={!!fieldState.error}
                        placeholder="example@domain.com"
                        className="h-12 w-full px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-[15px] font-normal tracking-tight placeholder-zinc-400 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:border-transparent focus-visible:bg-background"
                      />
                      <FieldError className="text-[13px] font-normal text-red-500 px-1 mt-0.5">
                        {fieldState.error?.message}
                      </FieldError>
                    </Field>
                  )}
                />

                {/* Password Field with Apple-style Inline Forgot Link */}
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={!!fieldState.error}
                      className="space-y-1"
                    >
                      <div className="flex items-center justify-between px-1">
                        <FieldLabel className="text-[12px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500">
                          Password
                        </FieldLabel>
                        <Link
                          href="/forgot-password"
                          className="text-[12px] font-normal text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:underline underline-offset-2 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        {...field}
                        type="password"
                        disabled={isPending}
                        aria-invalid={!!fieldState.error}
                        placeholder="Required"
                        className="h-12 w-full px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-[15px] font-normal tracking-tight placeholder-zinc-400 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:border-transparent focus-visible:bg-background"
                      />
                      <FieldError className="text-[13px] font-normal text-red-500 px-1 mt-0.5">
                        {fieldState.error?.message}
                      </FieldError>
                    </Field>
                  )}
                />
              </div>

              {/* Primary Call to Action Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-xl bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 text-[15px] font-medium transition-all duration-200 shadow-sm disabled:opacity-50 active:scale-[0.99] mt-8!"
              >
                {isPending ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </FormProvider>

          {/* Subtle Apple Custom Divider */}
          <div className="relative flex items-center my-8">
            <div className="w-full border-t border-zinc-100 dark:border-zinc-900" />
            <div className="absolute inset-0 flex items-center justify-center text-[11px] tracking-tight text-zinc-400">
              <span className="bg-background px-4 font-normal">or use</span>
            </div>
          </div>

          {/* Grid Layout for Minimal OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 bg-background text-[14px] font-medium tracking-tight gap-2 transition-all"
            >
              <GitHubIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
              GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 bg-background text-[14px] font-medium tracking-tight gap-2 transition-all"
            >
              <GoogleIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
              Google
            </Button>
          </div>

          {/* Minimalistic Footer Meta Links */}
          <div className="text-center text-[13px] text-zinc-400 dark:text-zinc-500 font-normal tracking-tight border-t border-zinc-100 dark:border-zinc-900 pt-6 mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium transition-colors ml-0.5"
            >
              Create yours now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

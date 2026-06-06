"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// import { authClient } from "@/lib/auth-client";

import { GitHubIcon, GoogleIcon } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.email,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message || "An error occurred during registration",
          );
        },
      },
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="w-full max-w-125 mx-auto flex flex-col justify-center px-4 antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Apple Header Typographic Hierarchy */}
      <Card className="px-5">
        <CardHeader className="space-y-1.5 text-center pt-8">
          <CardTitle className="text-[32px] font-semibold tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 leading-tight">
            Create ID
          </CardTitle>
          <CardDescription className="text-[15px] text-zinc-500 dark:text-zinc-400 font-normal tracking-tight max-w-70 mx-auto">
            One account connects you to your workspace.
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
                        Email <span className="text-red-500">*</span>
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

                {/* Password Field */}
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={!!fieldState.error}
                      className="space-y-1"
                    >
                      <FieldLabel className="text-[12px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500 px-1">
                        Password <span className="text-red-500">*</span>
                      </FieldLabel>
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

                {/* Confirm Password Field */}
                <Controller
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={!!fieldState.error}
                      className="space-y-1"
                    >
                      <FieldLabel className="text-[12px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500 px-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        disabled={isPending}
                        aria-invalid={!!fieldState.error}
                        placeholder="Confirm Password"
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
                className="w-full h-12 rounded-xl text-[15px] font-medium transition-all duration-200 shadow-sm disabled:opacity-50 active:scale-[0.99]"
              >
                {isPending ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                    Setting up...
                  </span>
                ) : (
                  "Continue"
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
          <div className="grid grid-cols-2 gap-3 mb-8">
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
          <div className="text-center text-[13px] text-zinc-400 dark:text-zinc-500 font-normal tracking-tight border-t border-zinc-100 dark:border-zinc-900 pt-6">
            Have an account?{" "}
            <Link
              href="/login"
              className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium transition-colors ml-0.5"
            >
              Sign in now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;

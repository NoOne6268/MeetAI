"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OctagonAlertIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignupView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setPending(true);
    setError(null);
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/"
      },
      {
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
        onSuccess: () => {
          // Redirect or refresh
          setPending(false);
          router.push("/");
        },
      }
    );
    
  };

  const onSocial = async (provider: "github" | "google") => {
    setPending(true);
    setError(null);
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/"
    }, {
      onError: ({ error }) => {
        setPending(false);
        setError(error.message);
      },
      onSuccess: () => {
        setPending(false);
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    Let&apos;s get started!
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Samanvia Kadamb"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-destructive">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle className="ml-2 text-sm">{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {pending ? "Signing Up..." : "Sign Up"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    disabled={pending}
                    onClick={() =>
                      onSocial("google")
                    }
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    <FaGoogle className="mr-2" /> Google
                  </Button>
                  <Button
                    disabled={pending}
                    onClick={() =>
                      onSocial("github")
                    }
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Login
                  </a>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <Image src={"/logo.svg"} alt="Logo" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By logging in, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

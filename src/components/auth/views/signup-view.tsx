'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
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
        await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
        }, {
            onError: ({ error }) => {
                setError(error.message);
            },
            onSuccess: () => {
                // Redirect or refresh
                router.push("/");
            },
        });
        setPending(false);
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
                                                <Input placeholder="Samanvia Kadamb" type="text" {...field} />
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
                                                <Input placeholder="your@email.com" type="email" {...field} />
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
                                                <Input placeholder="********" type="password" {...field} />
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
                                                <Input placeholder="********" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {!!error && (
                                <Alert className="bg-destructive/10 border-destructive">
                                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                    <AlertTitle className="ml-2 text-sm">
                                        {error}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <Button type="submit" disabled={pending} className="w-full" onClick={form.handleSubmit(onSubmit)}>
                                {pending ? "Signing Up..." : "Sign Up"}
                            </Button>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button disabled={pending} variant="outline" type="button" className="w-full">
                                    Google
                                </Button>
                                <Button disabled={pending} variant="outline" type="button" className="w-full">
                                    GitHub
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account? <a href="/login" className="underline underline-offset-4 hover:text-primary">Login</a>
                            </div>
                        </div>
                    </form>
                </Form>
                <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                    <img src={"/logo.svg"} alt="Logo" className="h-[92px] w-[92px]" />
                    <p className="text-2xl font-semibold text-white">Meet.AI</p>
                </div>
            </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By logging in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
    </div>
    );
};
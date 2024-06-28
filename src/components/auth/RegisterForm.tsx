"use client";

import { createUser } from "@/lib/actions";
import { Account } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues extends Account {
    password: string;
    confirmPass?: string;
}

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<FormValues>();
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setError("");
        delete data["confirmPass"];
        const newUser = await createUser(data);
        if (newUser.status == 201) router.push("/login");
        else setError(newUser.data);
    };

    const checkPass = watch("password", "");

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4"
            >
                <div className="flex w-full flex-col gap-2">
                    <div>
                        <input
                            type="text"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Email address"
                            placeholder="Email address"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-xs text-red-500">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Display Name"
                            placeholder="Display Name"
                            {...register("displayName", {
                                required: "This field is required",
                            })}
                        />
                        {errors.displayName && (
                            <span className="text-xs text-red-500">
                                {errors.displayName.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Username"
                            placeholder="Username"
                            {...register("username", {
                                required: "This field is required",
                                minLength: 3,
                            })}
                        />
                        {errors.username && (
                            <span className="text-xs text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Password"
                            placeholder="Password"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must contain atleast 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-xs text-red-500">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Confirm Password"
                            placeholder="Confirm Password"
                            {...register("confirmPass", {
                                required: "This field is required",
                                validate: (value) =>
                                    value === checkPass ||
                                    "Passwords do not match",
                            })}
                        />
                        {errors.confirmPass && (
                            <span className="text-xs text-red-500">
                                {errors.confirmPass.message}
                            </span>
                        )}
                    </div>
                </div>
                {error && <span className="text-xs text-red-500">{error}</span>}
                <span className="text-center text-xs text-neutral-400">
                    By signing up, you agree to our Terms, Privacy Policy, and
                    Cookies Policy.
                </span>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`rounded-lg py-1.5 text-sm text-white ${isSubmitting ? "bg-neutral-300" : "bg-[#4CB4F8]"}`}
                >
                    Sign Up
                </button>
            </form>
        </>
    );
}

"use client";

import { authClient } from "@/lib/auth-client";
import { saveToken } from "@/lib/api";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast"; // 1. Toast import kora hoyechhe
import { FcGoogle } from "react-icons/fc";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        console.error(error.message);
      } else {
        // Issue JWT and store in localStorage for API auth
        const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.user.email, role: data.user.role || "user" }),
        });
        const tokenData = await tokenRes.json();
        if (tokenData.token) saveToken(tokenData.token);
        toast.success("Welcome back! Signed in successfully.");
        router.push(redirectTo);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (err) {
      toast.error("Google sign in failed!");
      console.error("Google sign in failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F9] p-4">
      <div className="w-full max-w-[440px] bg-white px-8 py-10 shadow-xl rounded-[28px] border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#7C3AED] p-2 rounded-xl text-white flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#1E1E2F]">
              Biblio<span className="text-[#D97706]">Drop</span>
            </span>
          </div>
          <h2 className="text-[26px] font-extrabold text-[#111827] mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          variant="bordered"
          className="w-full h-12 border border-gray-200 hover:border-gray-300 rounded-xl font-medium text-gray-700 bg-white shadow-sm flex gap-3 text-[15px]"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>

        <div className="flex items-center my-6 text-gray-300">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-xs tracking-wider uppercase text-gray-400">
            or sign in with email
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <TextField isRequired name="email" type="email" className="w-full">
            <Label className="text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </Label>
            <Input
              placeholder="a@b.com"
              startContent={
                <IoMailOutline className="text-gray-400 text-lg mr-1" />
              }
              className="rounded-xl border-gray-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={isVisible ? "text" : "password"}
            className="w-full"
          >
            <Label className="text-sm font-semibold text-gray-700 mb-1">
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              startContent={
                <IoLockClosedOutline className="text-gray-400 text-lg mr-1" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <IoEyeOffOutline className="text-gray-400 text-xl" />
                  ) : (
                    <IoEyeOutline className="text-gray-400 text-xl" />
                  )}
                </button>
              }
              className="rounded-xl border-gray-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full h-12 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-[16px] rounded-xl mt-2 transition shadow-md shadow-indigo-100"
          >
            Sign In
          </Button>
        </Form>

        <p className="text-center mt-6 text-[14px] text-gray-500">
          Don't have an account?{" "}
          <Link
            href={`/signup?redirect=${redirectTo}`}
            className="text-[#6366F1] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

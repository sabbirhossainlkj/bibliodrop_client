"use client";
import { authClient } from "@/lib/auth-client";
import { saveToken } from "@/lib/api";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Radio,
  RadioGroup,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // ক্লিন গুগল লুকের জন্য FcGoogle ব্যবহার করা হয়েছে
import { LuBookOpen } from "react-icons/lu";

const SignupPage = () => {
  const router = useRouter();
  const [role, setRole] = useState("user");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email({
      name,
      image,
      email,
      password,
      role,
    });

    if (!error && data?.user) {
      const tokenRes = await fetch("http://localhost:5000/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.user.email,
          role: data.user.role || role,
        }),
      });
      const tokenData = await tokenRes.json();
      if (tokenData.token) saveToken(tokenData.token);
    }

    router.push(redirectTo);
  };

  const handleGoogleSingIn = async () => {
    const promise = authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto my-12 bg-white p-8 md:p-10 shadow-xl border border-gray-100 rounded-[32px] flex flex-col gap-6">
      {/* Brand Logo & Header */}
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <div className="flex items-center gap-2 justify-center">
          <div className="bg-[#8B5CF6] p-2 rounded-xl text-white shadow-md shadow-purple-200">
            <LuBookOpen className="text-2xl" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Biblio<span className="text-[#D97706]">Drop</span>
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-400 font-medium">
          Sign up to your account to get started
        </p>
      </div>

      {/* Google Sign In - Top Side (As per image_138123.png) */}
      <Button
        onClick={handleGoogleSingIn}
        variant="bordered"
        className="w-full h-12 text-md font-semibold text-gray-700 bg-white border-gray-200 hover:bg-gray-50 rounded-2xl shadow-sm flex items-center justify-center gap-2"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </Button>

      {/* Modern Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
          Or Sign Up With Email
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Signup Form */}
      <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="name"
          type="text"
          className="w-full flex flex-col gap-1.5"
        >
          <Label className="text-sm font-bold text-gray-700">
            Name<span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="Enter your name"
            variant="flat"
            className="bg-[#EFF6FF] rounded-xl font-medium"
          />
          <FieldError className="text-xs text-red-500 mt-0.5" />
        </TextField>
        <TextField
          isRequired
          name="image"
          type="text"
          className="w-full flex flex-col gap-1.5"
        >
          <Label className="text-sm font-bold text-gray-700">
            Image URL<span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="Image Url"
            variant="flat"
            className="bg-[#EFF6FF] rounded-xl font-medium"
          />
          <FieldError className="text-xs text-red-500 mt-0.5" />
        </TextField>
        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full flex flex-col gap-1.5"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="text-sm font-bold text-gray-700">
            Email Address<span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="users@gmail.com"
            variant="flat"
            className="bg-[#EFF6FF] rounded-xl font-medium"
          />
          <FieldError className="text-xs text-red-500 mt-0.5" />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          className="w-full flex flex-col gap-1.5"
          validate={(value) => {
            if (value.length < 8)
              return "Password must be at least 8 characters";
            if (!/[A-Z]/.test(value))
              return "Password must contain at least one uppercase letter";
            if (!/[0-9]/.test(value))
              return "Password must contain at least one number";
            return null;
          }}
        >
          <Label className="text-sm font-bold text-gray-700">
            Password<span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="••••••••••••"
            variant="flat"
            className="bg-[#EFF6FF] rounded-xl font-medium"
          />
          <Description className="text-xs text-gray-400 mt-0.5">
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError className="text-xs text-red-500 mt-0.5" />
        </TextField>
        {/* role selection */}{" "}
        <div className="flex flex-col gap-4">
          <Label>Subscription plan</Label>{" "}
          <RadioGroup
            onChange={(value) => setRole(value)}
            defaultValue="user"
            name="role"
            orientation="horizontal"
          >
            {" "}
            <Radio value="user">
              {" "}
              <Radio.Content>
                {" "}
                <Radio.Control>
                  <Radio.Indicator />{" "}
                </Radio.Control>
                Users{" "}
              </Radio.Content>
              <Description>For side projects</Description>{" "}
            </Radio>{" "}
            <Radio value="librarian">
              {" "}
              <Radio.Content>
                {" "}
                <Radio.Control>
                  <Radio.Indicator />{" "}
                </Radio.Control>
                Librarian{" "}
              </Radio.Content>{" "}
            </Radio>{" "}
          </RadioGroup>{" "}
        </div>
        {/* Submit Button */}
        <Button
          className="w-full h-12 text-white text-md font-bold bg-[#6366F1] hover:bg-[#5356E2] active:scale-[0.98] transition-transform rounded-2xl shadow-md shadow-indigo-100 mt-4 flex items-center justify-center gap-2"
          type="submit"
        >
          <Check className="text-lg" />
          Create Account
        </Button>
      </Form>

      {/* Footer Link */}
      <p className="text-center mt-4 text-sm font-medium text-gray-500">
        Already have an account?{" "}
        <Link
          href={`/signin?redirect=${redirectTo}`}
          className="text-[#6366F1] font-bold hover:underline ml-1"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;

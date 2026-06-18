"use client";

import { authClient } from "@/lib/auth-client";
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
import { AiFillGoogleCircle } from "react-icons/ai";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({ email, password });

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    // console.log({ data, error });

    router.push(redirectTo);
  };

  const handleGoogleSingIn = async () => {
    const promise = authClient.signIn.social({
      provider: "google",
    });
    };

  return (
    <div className="w-6/12 mx-auto my-6 border p-6 shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <FieldError />
        </TextField>

        <Button
          type="submit"
          isLoading={loading}
          className="w-full bg-[#15A1BF] text-white font-semibold"
        >
          Sign In
        </Button>
      </Form>

      
      <p className="text-2xl whitespace-nowrap font-bold text-center text-gray-400">
        Or 
      </p>

      <Button onClick={handleGoogleSingIn} className="w-full text-xl">
        <AiFillGoogleCircle />
        Sign In with Google
      </Button>

      <p className="text-center mt-6 text-sm">
        new to BiblioDrop?{" "}
        <Link
          href={`/signup?redirect=${redirectTo}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

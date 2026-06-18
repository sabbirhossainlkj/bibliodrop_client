"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Radio, RadioGroup } from "@heroui/react";
import { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";

const signupPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({ name, image, email, password });

    const { data, error } = await authClient.signUp.email({
      name,
      image,
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
    <div className="w-6/12 space-y-4 mx-auto my-6 border p-6 shadow-2xl py-9 rounded-2xl">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>

      <Form className="flex flex-col gap-4 space-y-2" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="text">
          <Label>Image URL</Label>
          <Input placeholder="Image Url" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex flex-col gap-3">
          <Button
            className="w-full text-white text-md font-bold bg-[#15A1BF]"
            type="submit"
          >
            <Check />
            Create Account
          </Button>
        </div>
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
          href={`/signin?redirect=${redirectTo}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default signupPage;

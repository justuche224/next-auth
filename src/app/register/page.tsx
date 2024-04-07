"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    // Minimum length requirement
    if (password.length < 8) {
      return false;
    }

    // Character class requirements
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    // At least 3 out of 4 character classes must be present
    return (
      (hasLowercase && hasUppercase && hasNumber && hasSymbol) ||
      (hasLowercase && hasUppercase && hasNumber) ||
      (hasLowercase && hasUppercase && hasSymbol) ||
      (hasLowercase && hasNumber && hasSymbol)
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password is invalid. Must be at least 8 characters and contain a mix of uppercase, lowercase letters, numbers, and symbols."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
        setLoading(false);
      }
      if (res.status === 200) {
        setError("");
        // router.push("/login");
        setRegistered(true);
        setLoading(false);
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  if (sessionStatus === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {registered && (
        <div className="modal fixed top-0 left-0 min-h-screen w-full bg-[#000000c9] text-white flex flex-col gap-3 justify-center items-center text-center p-5">
          <h1>
            a link has been sent to your mail box. click the link to verify your
            account
          </h1>
          <button
            className="px-3 py-2 bg-blue-500 rounded"
            type="button"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      )}
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verifing, setVerifing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }
    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/verify-email?token=${token}`);
        if (res.status === 200) {
          setVerifing(false);
        } else {
          const data = await res.json(); // Get error message from JSON
          setError(data.message);
          console.log("Verification failed");
          setVerifing(false);
        }
      } catch (error) {
        console.error(error);
        setError("Network error");
        setVerifing(false);
      } finally {
        setVerifing(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {verifing ? (
        <h1>Verifing email</h1>
      ) : (
        <div>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <div>
              <h1>Account verified</h1>
              <button type="button" onClick={() => router.replace("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

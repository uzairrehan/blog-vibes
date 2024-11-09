"use client";

import { auth } from "@/firebase/firebaseconfig";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const email = auth.currentUser?.email;
  const currentUser = auth.currentUser;
  const route = useRouter();

  function checkUser() {
    if (currentUser?.emailVerified) {
      route.push("/");
      return;
    }

    if (!currentUser?.emailVerified && currentUser) {
      try {
        sendEmailVerification(currentUser);
        toast.success(`Verification email sent to ${email}`);
        setIsLoading(false);
      } catch (e) {
        toast.error(`failed ${e}`);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  const handleResend = async () => {
    setIsLoading(true);
    checkUser();
  };

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="card w-full max-w-sm p-8 shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Email Verification
        </h2>

        <div className="space-y-4">
          <div>
            Check your email! <br /> {email?.toString()}
          </div>

          <button
            className={`btn btn-primary w-full`}
            onClick={handleResend}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Again"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

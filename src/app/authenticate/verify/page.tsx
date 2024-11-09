"use client";

import Loading from "@/components/loading";
import { auth } from "@/firebase/firebaseconfig";
import { sendEmailVerification, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const route = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email);
      setUser(currentUser);
      if (currentUser.emailVerified) {
        route.push("/");
      } else {
        sendVerificationEmail(currentUser);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const sendVerificationEmail = async (currentUser: User) => {
    try {
      await sendEmailVerification(currentUser);
      toast.success(`Verification email sent to ${currentUser.email}`);
      setIsLoading(false);
    } catch (e) {
      toast.error(`Failed to send verification email: ${e}`);
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (user) {
      setIsLoading(true);
      sendVerificationEmail(user);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="card w-full max-w-sm p-8 shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Email Verification
        </h2>

        <div className="space-y-4">
          {email && (
            <div>
              Check your email! {email.toString()} <br />
              Verify it and then reload this page!
            </div>
          )}

          <button
            className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
            onClick={handleResend}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import SuccessAnimation from "@/public/lotties/Success.json";
import ErrorAnimation from "@/public/lotties/Error.json";

const SuccessPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");

      if (accessToken) {
        localStorage.setItem("authtoken", accessToken);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError("Access token not found.");
      }
    } else {
      setError("No authentication data found in URL.");
    }
  }, [router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {error ? (
        <Lottie animationData={ErrorAnimation} loop={false} style={{ width: 200, height: 200 }} />
      ) : (
        <Lottie animationData={SuccessAnimation} loop={false} style={{ width: 200, height: 200 }} />
      )}
    </div>
  );
};

export default SuccessPage;
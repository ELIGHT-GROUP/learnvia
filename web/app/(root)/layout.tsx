import AuthMiddleware from "@/components/common/AuthMiddleware";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthMiddleware>{children}</AuthMiddleware>;
};

export default RootLayout;

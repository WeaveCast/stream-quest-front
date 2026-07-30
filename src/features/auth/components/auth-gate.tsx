"use client";

import { useCurrentUser } from "../api/use-current-user";
import { LoginButton } from "./login-button";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loadings...</div>;

  if (isError || !user) {
    return (
      <div>
        <p>Not connected</p>
        <LoginButton />
      </div>
    );
  }

  return <>{children}</>;
}

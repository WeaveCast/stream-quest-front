import { Button } from "@/components/ui/button";

export function LoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/twitch`;
  };

  return (
    <Button variant="primary" onClick={handleLogin}>
      Log in with Twitch
    </Button>
  );
}

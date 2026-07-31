import { LoginButton } from "@/features/auth";
import { Heading, Text } from "@/components/ui/typography";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-lg bg-bg-base">
      <Heading as="h1" size="h1">
        StreamQuest
      </Heading>
      <Text size="body-lg">
        A real-time TTRPG event engine driven by Twitch viewers
      </Text>
      <LoginButton />
    </main>
  );
}

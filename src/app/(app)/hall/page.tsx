import { CampaignList } from "@/features/campaign";
import { Heading, Text } from "@/components/ui/typography";

export default function HallPage() {
  return (
    <div>
      <Heading as="h1" size="h1" className="mb-xs">
        The Hall
      </Heading>
      <Text size="body-lg" className="mb-xl">
        Choose a campaign to open its live dashboard.
      </Text>
      <CampaignList />
    </div>
  );
}

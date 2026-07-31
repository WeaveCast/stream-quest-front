import { CampaignList } from "@/features/campaign";
import { Heading } from "@/components/ui/typography";

export default function SagaPage() {
  return (
    <div>
      <Heading as="h1" size="h1" className="mb-xl">
        The Saga
      </Heading>
      <CampaignList />
    </div>
  );
}

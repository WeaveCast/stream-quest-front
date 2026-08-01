// src/app/(app)/saga/page.tsx
"use client";

import { useState } from "react";
import { CampaignList } from "@/features/campaign";
import { CreateCampaignForm } from "@/features/campaign/components/create-campaign-form";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SagaPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-xl">
        <Heading as="h1" size="h1">
          The Saga
        </Heading>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New campaign</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create a new campaign</DialogTitle>
            <CreateCampaignForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <CampaignList />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useSessions } from "../api/use-sessions";
import { useStartSession } from "../api/use-start-session";
import { useEndSession } from "../api/use-end-session";
import { CreateSessionForm } from "./create-session-form";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/typography";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const statusColor = {
  PLANNED: "neutral",
  LIVE: "success",
  ENDED: "neutral",
} as const;

export function SessionPanel({ campaignId }: { campaignId: string }) {
  const { data: sessions, isLoading } = useSessions(campaignId);
  const startSession = useStartSession(campaignId);
  const endSession = useEndSession(campaignId);
  const [dialogOpen, setDialogOpen] = useState(false);

  const liveSession = sessions?.find((s) => s.status === "LIVE");

  return (
    <Card>
      <div className="flex items-center justify-between mb-sm">
        <CardTitle className="mb-0">Sessions</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="small"
              disabled={!!liveSession}
              title={liveSession ? "End the live session first" : undefined}
            >
              + New Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>New Session</DialogTitle>
            <CreateSessionForm
              campaignId={campaignId}
              onSuccess={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <CardBody className="flex flex-col gap-sm">
        {isLoading && <Text size="body-sm">Loading sessions...</Text>}
        {!isLoading && sessions?.length === 0 && (
          <Text size="body-sm">No sessions yet.</Text>
        )}

        {sessions?.map((session) => (
          <div key={session.id} className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <Badge color={statusColor[session.status]} size="small">
                {session.status}
              </Badge>
              <Link
                href={`/hall/${campaignId}/${session.id}`}
                className="hover:text-accent-gold"
              >
                <Text as="span" size="body-sm">
                  {session.title}
                </Text>
              </Link>
            </div>
            <div className="flex gap-2xs">
              {session.status === "PLANNED" && (
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => startSession.mutate(session.id)}
                  disabled={startSession.isPending || !!liveSession}
                >
                  Start
                </Button>
              )}
              {session.status === "LIVE" && (
                <Button
                  size="small"
                  variant="danger"
                  onClick={() => endSession.mutate(session.id)}
                  disabled={endSession.isPending}
                >
                  End
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

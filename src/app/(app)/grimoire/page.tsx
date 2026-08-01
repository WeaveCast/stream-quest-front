"use client";

import { useMemo, useState } from "react";
import { EventDetailDialog } from "@/features/event";
import { useEventTypes } from "@/features/event-type";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { ResolutionMode } from "@/features/event";
import { CreateEventTypeForm } from "@/features/event-type/components/create-event-type-form";
import { CreateEventForm } from "@/features/event/components/create-event-form";
import { useEvents } from "@/features/event/api/use-events";

const RESOLUTION_MODES: ResolutionMode[] = [
  "RANDOM",
  "MJ_CHOICE",
  "VIEWER_VOTE",
];

export default function GrimoirePage() {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: eventTypes } = useEventTypes();

  const eventTypeName = (id: string) =>
    eventTypes?.find((t) => t.id === id)?.name ?? "—";

  const filteredEvents = useMemo(() => {
    return (events ?? []).filter((event) => {
      if (typeFilter !== "all" && event.eventTypeId !== typeFilter)
        return false;
      if (modeFilter !== "all" && event.resolutionMode !== modeFilter)
        return false;
      if (search && !event.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [events, typeFilter, modeFilter, search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-xl">
        <Heading as="h1" size="h1">
          The Grimoire
        </Heading>
        <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
          <DialogTrigger asChild>
            <Button>+ New Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create an event</DialogTitle>
            <CreateEventForm onSuccess={() => setEventDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-xl">
        <div className="w-64 shrink-0">
          <div className="rounded-lg border border-border-default/40 p-lg">
            <Heading as="h2" size="h4" className="mb-md">
              Event Types
            </Heading>
            <ul className="flex flex-col gap-xs mb-md">
              <li>
                <button
                  onClick={() => setTypeFilter("all")}
                  className={`text-body-sm text-left w-full ${typeFilter === "all" ? "text-accent-gold" : "text-text-secondary hover:text-text-primary"}`}
                >
                  · All types
                </button>
              </li>
              {eventTypes?.map((type) => (
                <li key={type.id}>
                  <button
                    onClick={() => setTypeFilter(type.id)}
                    className={`text-body-sm text-left w-full ${typeFilter === type.id ? "text-accent-gold" : "text-text-secondary hover:text-text-primary"}`}
                  >
                    · {type.name}
                  </button>
                </li>
              ))}
            </ul>
            <Dialog open={typeDialogOpen} onOpenChange={setTypeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="small" className="w-full">
                  + New Type
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Create an event type</DialogTitle>
                <CreateEventTypeForm
                  onSuccess={() => setTypeDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-md mb-md">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {eventTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                {RESOLUTION_MODES.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
          </div>

          {eventsLoading && <Text>Loading events...</Text>}

          {!eventsLoading && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Karma</TableHead>
                  <TableHead>Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <button
                        onClick={() => setSelectedEventId(event.id)}
                        className="hover:text-accent-gold text-left"
                      >
                        {event.name}
                      </button>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      <button
                        onClick={() => setSelectedEventId(event.id)}
                        className="text-left w-full"
                      >
                        {eventTypeName(event.eventTypeId)}
                      </button>
                    </TableCell>
                    <TableCell
                      className={
                        event.karmaValue > 0
                          ? "text-status-ok"
                          : event.karmaValue < 0
                            ? "text-danger-emphasis"
                            : "text-text-secondary"
                      }
                    >
                      {event.karmaValue > 0
                        ? `+${event.karmaValue}`
                        : event.karmaValue}
                    </TableCell>
                    <TableCell>
                      <span className="text-mono text-text-secondary">
                        {event.resolutionMode}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!eventsLoading && filteredEvents.length === 0 && (
            <Text className="mt-lg">No events match your filters.</Text>
          )}
        </div>
      </div>
      <EventDetailDialog
        key={selectedEventId}
        eventId={selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
}

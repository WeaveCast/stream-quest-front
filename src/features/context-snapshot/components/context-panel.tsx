"use client";

import { useState } from "react";
import { useContextSnapshots } from "../api/use-context-snapshots";
import { useUpdateContextSnapshot } from "../api/use-update-context-snapshot";
import { useWeathers } from "@/features/weather";
import { useLocations } from "@/features/location";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TIME_OF_DAY, type TimeOfDay, type ContextSnapshot } from "../types";
import { ManageReferenceDataDialog } from "@/components/shared/manage-reference-data-dialog";
import { useCreateLocation } from "@/features/location/api/use-create-location";
import { useDeleteLocation } from "@/features/location/api/use-delete-location";
import { useCreateWeather } from "@/features/weather/api/use-create-weather";
import { useDeleteWeather } from "@/features/weather/api/use-delete-weather";
import { useUpdateLocation } from "@/features/location/api/use-update-location";
import { useUpdateWeather } from "@/features/weather/api/use-update-weather";

export function ContextPanel({ sessionId }: { sessionId: string }) {
  const { data: snapshots } = useContextSnapshots(sessionId);
  const latest = snapshots?.[snapshots.length - 1];
  const { data: weathers } = useWeathers();
  const createWeather = useCreateWeather();
  const deleteWeather = useDeleteWeather();

  const { data: locations } = useLocations();
  const createLocation = useCreateLocation();
  const deleteLocation = useDeleteLocation();

  const updateWeather = useUpdateWeather();
  const updateLocation = useUpdateLocation();

  return (
    <Card>
      <CardTitle>Context</CardTitle>
      <CardBody>
        <div className="flex gap-xs mb-sm">
          <ManageReferenceDataDialog
            title="Manage Weathers"
            triggerLabel="Manage Weathers"
            imageFieldLabel="Icon URL (optional)"
            items={weathers}
            onCreate={(payload) =>
              createWeather.mutate({
                name: payload.name,
                displayName: payload.displayName,
                description: payload.description,
                iconUrl: payload.imageUrl,
              })
            }
            onUpdate={(id, payload) =>
              updateWeather.mutate({
                id,
                payload: {
                  name: payload.name,
                  displayName: payload.displayName,
                  description: payload.description,
                  iconUrl: payload.imageUrl,
                },
              })
            }
            onDelete={(id) => deleteWeather.mutate(id)}
            isCreating={createWeather.isPending}
            isUpdating={updateWeather.isPending}
          />
          <ManageReferenceDataDialog
            title="Manage Locations"
            triggerLabel="Manage Locations"
            imageFieldLabel="Image URL (optional)"
            items={locations}
            onCreate={(payload) => createLocation.mutate(payload)}
            onUpdate={(id, payload) => updateLocation.mutate({ id, payload })}
            onDelete={(id) => deleteLocation.mutate(id)}
            isCreating={createLocation.isPending}
            isUpdating={updateLocation.isPending}
          />
        </div>
        <ContextForm
          key={latest?.id ?? "empty"}
          sessionId={sessionId}
          latest={latest}
        />
      </CardBody>
    </Card>
  );
}

function ContextForm({
  sessionId,
  latest,
}: {
  sessionId: string;
  latest?: ContextSnapshot;
}) {
  const { data: weathers } = useWeathers();
  const { data: locations } = useLocations();
  const updateSnapshot = useUpdateContextSnapshot(sessionId);

  const [weatherId, setWeatherId] = useState(latest?.weatherId ?? "");
  const [locationId, setLocationId] = useState(latest?.locationId ?? "");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | "">(
    latest?.timeOfDay ?? "",
  );

  function handleApply() {
    updateSnapshot.mutate({
      weatherId: weatherId || undefined,
      locationId: locationId || undefined,
      timeOfDay: timeOfDay || undefined,
    });
  }

  return (
    <div className="flex flex-col gap-md">
      <Field label="Location">
        <Select value={locationId} onValueChange={setLocationId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Weather">
        <Select value={weatherId} onValueChange={setWeatherId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {weathers?.map((w) => (
              <SelectItem key={w.id} value={w.id}>
                {w.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Time of day">
        <Select
          value={timeOfDay}
          onValueChange={(v) => setTimeOfDay(v as TimeOfDay)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {TIME_OF_DAY.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Button
        onClick={handleApply}
        disabled={updateSnapshot.isPending}
        className="w-full"
      >
        {updateSnapshot.isPending ? "Applying..." : "Apply Context"}
      </Button>
    </div>
  );
}

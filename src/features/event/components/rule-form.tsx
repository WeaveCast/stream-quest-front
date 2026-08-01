"use client";

import { useState } from "react";
import { useCreateRule } from "../api/rule/use-create-rule";
import { useUpdateRule } from "../api/rule/use-update-rule";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TRIGGER_TYPES } from "../types";
import type { Rule } from "../types";

export function RuleForm({
  eventId,
  rule,
  onSuccess,
  onCancel,
}: {
  eventId: string;
  rule?: Rule;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const createRule = useCreateRule(eventId);
  const updateRule = useUpdateRule(eventId);
  const isEditing = !!rule;

  const [triggerType, setTriggerType] = useState(rule?.triggerType ?? "");
  const [cooldown, setCooldown] = useState(String(rule?.cooldown ?? 300));
  const [command, setCommand] = useState(
    typeof rule?.config?.command === "string" ? rule.config.command : "",
  );

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!triggerType) return;
    const config = triggerType === "CHAT_COMMAND" && command ? { command } : {};
    const payload = { triggerType, config, cooldown: Number(cooldown) };

    if (isEditing) {
      updateRule.mutate({ ruleId: rule.id, payload }, { onSuccess });
    } else {
      createRule.mutate(payload, { onSuccess });
    }
  }

  const isPending = createRule.isPending || updateRule.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-sm w-full bg-bg-base rounded-sm p-sm"
    >
      <div className="flex gap-md">
        <Field label="Trigger type" className="flex-1">
          <Select value={triggerType} onValueChange={setTriggerType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {TRIGGER_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Cooldown (s)" className="flex-1">
          <Input
            showIcon={false}
            type="number"
            value={cooldown}
            onChange={(e) => setCooldown(e.target.value)}
            className="w-full"
          />
        </Field>
      </div>

      {triggerType === "CHAT_COMMAND" && (
        <Field label="Command">
          <Input
            placeholder="!wolf"
            showIcon={false}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="w-full"
          />
        </Field>
      )}

      <div className="flex gap-sm">
        <Button
          type="submit"
          size="small"
          disabled={isPending || !triggerType}
          className="flex-1"
        >
          {isPending ? "Saving..." : isEditing ? "Save" : "Add"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

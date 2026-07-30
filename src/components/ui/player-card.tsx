import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { Avatar } from "./avatar";
import { cn } from "@/lib/utils";
import { Heading, Text } from "./typography";
import { ProgressBar } from "./progress-bar";
import { Badge } from "./badge";

export type CharacterRingStatus = "ok" | "hurt" | "critical" | "unconscious";

export interface PlayerCardCharacter {
  name: string;
  avatarUrl?: string | null;
  class?: string | null;
  level?: number | null;
  currentHp?: number | null;
  maxHp?: number | null;
  armorClass?: number | null;
  status: CharacterRingStatus;
  displayAvatar: boolean;
  displayClass: boolean;
  displayLevel: boolean;
  displayHp: boolean;
  displayArmorClass: boolean;
  displayStatus: boolean;
}

const playerCardVariants = cva(
  "flex items-center rounded-xl border-2 border-bg-surface p-xl shadow-elevation-md",
  {
    variants: {
      layout: {
        vertical: "flex-col",
        horizontal: "flex-row",
        minimal: "flex-row",
      },
    },
    defaultVariants: {
      layout: "vertical",
    },
  },
);

export interface PlayerCardProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof playerCardVariants> {
  character: PlayerCardCharacter;
}

export function PlayerCard({
  className,
  character,
  layout = "vertical",
  ...props
}: PlayerCardProps) {
  const {
    name,
    avatarUrl,
    status,
    class: characterClass,
    level,
    currentHp,
    maxHp,
    armorClass,
    displayAvatar,
    displayClass,
    displayLevel,
    displayHp,
    displayArmorClass,
    displayStatus,
  } = character;

  const hasHp = currentHp != null && maxHp != null && maxHp > 0;
  const percentHp = hasHp ? (currentHp / maxHp) * 100 : 0;
  let hpStatus: "ok" | "hurt" | "critical" | "unconscious" = "ok";

  if (percentHp <= 50) {
    hpStatus = "hurt";
  }
  if (percentHp <= 25) {
    hpStatus = "critical";
  }
  if (percentHp == 0) {
    hpStatus = "unconscious";
  }

  const showClassLevelLine = displayClass || displayLevel;

  if (layout === "vertical") {
    return (
      <div className={cn(playerCardVariants({ layout, className }))} {...props}>
        {displayAvatar && (
          <Avatar
            avatarName={name}
            avatarUrl={avatarUrl ?? undefined}
            status={status}
            size="md"
          />
        )}

        <div className="flex items-center gap-xs">
          <Heading as="h5" size="h3">
            {name}
          </Heading>
        </div>

        {showClassLevelLine && (
          <Text as="span" size="label" className="flex flex-row gap-4">
            {displayClass && characterClass}
            {displayClass && displayLevel && (
              <span className="text-accent-gold">•</span>
            )}
            {displayLevel && `Lv. ${level}`}
            {(displayClass || displayLevel) &&
              displayArmorClass &&
              armorClass != null && <span className="text-accent-gold">•</span>}
            {displayArmorClass && armorClass != null && `AC: ${armorClass}`}
          </Text>
        )}

        {displayHp && hasHp && (
          <div className="flex items-center gap-sm w-full">
            <ProgressBar
              max={maxHp}
              value={currentHp}
              color={hpStatus}
              className="flex-1"
            />
            <Text
              as="span"
              size="body-sm"
              className="shrink-0 whitespace-nowrap"
            >
              {currentHp}/{maxHp}
            </Text>
            {displayStatus && (
              <Badge color={hpStatus} statusDot={hpStatus}>
                {hpStatus.charAt(0).toUpperCase() + hpStatus.slice(1)}
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  }

  if (layout === "horizontal") {
    return (
      <div className={cn(playerCardVariants({ layout, className }))} {...props}>
        {displayAvatar && (
          <Avatar
            avatarName={name}
            avatarUrl={avatarUrl ?? undefined}
            status={status}
            size="md"
          />
        )}

        <div className="flex flex-col gap-xs w-full ml-xl">
          <div className="flex flex-row gap-xs w-full">
            <Heading as="h5" size="h3">
              {name}
            </Heading>
            {showClassLevelLine && (
              <Text
                as="span"
                size="label"
                className="flex flex-row gap-4 items-center ml-sm"
              >
                {displayClass && characterClass}
                {displayClass && displayLevel && (
                  <span className="text-accent-gold">•</span>
                )}
                {displayLevel && `Lv. ${level}`}
                {(displayClass || displayLevel) &&
                  displayArmorClass &&
                  armorClass != null && (
                    <span className="text-accent-gold">•</span>
                  )}
                {displayArmorClass && armorClass != null && `AC: ${armorClass}`}
              </Text>
            )}
          </div>

          {displayHp && hasHp && (
            <div className="flex items-center gap-sm w-full">
              <ProgressBar
                max={maxHp}
                value={currentHp}
                color={hpStatus}
                className="flex-1"
              />
              <Text
                as="span"
                size="body-sm"
                className="shrink-0 whitespace-nowrap"
              >
                {currentHp}/{maxHp}
              </Text>
              {displayStatus && (
                <Badge color={hpStatus} statusDot={hpStatus}>
                  {hpStatus.charAt(0).toUpperCase() + hpStatus.slice(1)}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (layout === "minimal") {
    return (
      <div className={cn(playerCardVariants({ layout, className }))} {...props}>
        {displayAvatar && (
          <Avatar
            avatarName={name}
            avatarUrl={avatarUrl ?? undefined}
            status={status}
            size="md"
          />
        )}

        <div className="flex flex-col gap-sm w-full ml-xl">
          <div className="flex items-center gap-xs">
            <Heading as="h5" size="h5">
              {name}
            </Heading>
            {displayClass && (
              <Text as="span" size="mono" className="ml-sm">
                {characterClass}
              </Text>
            )}
            {displayLevel && (
              <Text as="span" size="mono" className="ml-sm">
                Lv. {level}
              </Text>
            )}
          </div>

          {displayHp && hasHp && (
            <div className="flex items-center gap-sm w-full">
              <ProgressBar
                max={maxHp}
                value={currentHp}
                color={hpStatus}
                size="sm"
                className="flex-1"
              />
            </div>
          )}

          <Text as="span" size="label" className="flex flex-row">
            {displayStatus && (
              <>
                <Text
                  as="span"
                  size="mono"
                  className="flex flex-row gap-4 items-center"
                >
                  {displayHp && hasHp && (
                    <Text
                      as="span"
                      size="mono"
                      className="shrink-0 whitespace-nowrap"
                    >
                      {currentHp}/{maxHp}
                    </Text>
                  )}
                  {displayArmorClass &&
                    armorClass != null &&
                    `AC: ${armorClass}`}
                  {displayStatus && (
                    <Badge
                      color={hpStatus}
                      statusDot={hpStatus}
                      className="-ml-md"
                    >
                      {hpStatus.charAt(0).toUpperCase() + hpStatus.slice(1)}
                    </Badge>
                  )}
                </Text>
              </>
            )}
          </Text>
        </div>
      </div>
    );
  }
}

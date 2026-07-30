// src/app/page.tsx
"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { KarmaBar } from "@/components/ui/karma-bar";
import { PlayerCard } from "@/components/ui/player-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SidebarNavItem } from "@/components/ui/sidebar-nav-item";
import { StatusDot } from "@/components/ui/status-dot";
import { Toggle } from "@/components/ui/toggle";
import { Heading, Text } from "@/components/ui/typography";
import { AuthGate } from "@/features/auth";
import { useCurrentUser } from "@/features/auth";
import { Select, SelectValue } from "@radix-ui/react-select";
import { Book, HomeIcon, Search } from "lucide-react";

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <AuthGate>
      <main className="p-8">
        <h1 className="text-2xl font-bold">StreamQuest</h1>
        <p>Connected as {user?.username}</p>

        <div
          className="Typographies text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Typographies</h1>
          <h2>Headings</h2>
          <Heading as="h1" size="h1">
            H1 h1 sized Heading
          </Heading>
          <Heading as="h2" size="h2">
            H2 h2 sized Heading
          </Heading>
          <Heading as="h3" size="h3">
            H3 h3 sized Heading
          </Heading>
          <Heading as="h4" size="h4">
            H4 h4 sized Heading
          </Heading>
          <Heading as="h5" size="h5">
            H5 h5 sized Heading
          </Heading>

          <h2>Texts</h2>
          <Text as="p" size="body">
            P body Text
          </Text>
          <Text as="p" size="body-sm">
            P body-sm Text
          </Text>
          <Text as="p" size="body-lg">
            P body-lg Text
          </Text>
          <Text as="p" size="label">
            P label Text
          </Text>
          <Text as="p" size="mono">
            P mono Text
          </Text>

          <Text as="span" size="body">
            Span body Text
          </Text>
          <Text as="span" size="body-sm">
            Span body-sm Text
          </Text>
          <Text as="span" size="body-lg">
            Span body-lg Text
          </Text>
          <Text as="span" size="label">
            Span label Text
          </Text>
          <Text as="span" size="mono">
            Span mono Text
          </Text>

          <Text as="div" size="body">
            Div body Text
          </Text>
          <Text as="div" size="body-sm">
            Div body-sm Text
          </Text>
          <Text as="div" size="body-lg">
            Div body-lg Text
          </Text>
          <Text as="div" size="label">
            Div label Text
          </Text>
          <Text as="div" size="mono">
            Div mono Text
          </Text>
        </div>

        <div
          className="Buttons text-2xl font-bold flex flex-col gap-md size-max"
          style={{ margin: "20px 0" }}
        >
          <h1>Buttons</h1>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <div
          className="Badges text-2xl font-bold flex flex-col gap-md size-max"
          style={{ margin: "20px 0" }}
        >
          <h1>Badges</h1>
          <Badge color="neutral">Neutral</Badge>
          <Badge color="gold">Gold</Badge>
          <Badge color="danger">Danger</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="success" size="small">
            Small
          </Badge>
        </div>

        <div
          className="StatusDots text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Status Dots</h1>
          <StatusDot color="ok" />
          <StatusDot color="hurt" />
          <StatusDot color="critical" />
          <StatusDot color="inspired" />
          <StatusDot color="poisoned" />
          <StatusDot color="unconscious" />
          <StatusDot color="asleep" />
        </div>

        <div
          className="Cards text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Cards</h1>
          <Card>
            <CardTitle>Card Title</CardTitle>
            <CardBody>Card Body</CardBody>
          </Card>

          <Card>
            <CardTitle size="h3">Card Title</CardTitle>
            <CardBody size="mono">Card Body</CardBody>
          </Card>
        </div>

        <div
          className="Inputs text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Inputs</h1>
          <Input placeholder="Search..." />
          <Input placeholder="Disabled input" disabled />
        </div>

        <div
          className="Selects text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Selects</h1>
          <Select defaultValue="dark-forest">
            <SelectTrigger>
              <SelectValue placeholder="Select a location..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark-forest">Dark Forest</SelectItem>
              <SelectItem value="ruins">Ancient Ruins</SelectItem>
              <SelectItem value="tavern">The Tavern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div
          className="IconButtons text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>IconButtons</h1>
          <IconButton>
            <Search size={32} />
          </IconButton>
          <IconButton variant="filled">
            <Search size={32} />
          </IconButton>
        </div>

        <div
          className="Toggles text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Toggles</h1>
          <Toggle />
          <Toggle defaultChecked />
          <Toggle disabled />
        </div>

        <div
          className="Sidebar Nav Item text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Sidebar Nav Item</h1>
          <SidebarNavItem href="/" icon={<HomeIcon size={16} />}>
            The Hall
          </SidebarNavItem>

          <SidebarNavItem href="/saga" icon={<Book size={16} />}>
            The Saga
          </SidebarNavItem>
        </div>

        <div
          className="Avatars Nav Item text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>Avatars</h1>
          <div className="flex items-center gap-md">
            <Avatar avatarName="Aragorn" status="ok" size="xsm" />
            <Avatar avatarName="Aragorn" status="ok" size="sm" />
            <Avatar avatarName="Aragorn" status="ok" size="md" />
            <Avatar avatarName="Aragorn" status="ok" size="lg" />
          </div>

          <div className="flex items-center gap-md">
            <Avatar avatarName="Aragorn" status="ok" size="md" />
            <Avatar avatarName="Aragorn" status="hurt" size="md" />
            <Avatar avatarName="Aragorn" status="critical" size="md" />
            <Avatar avatarName="Aragorn" status="unconscious" size="md" />
          </div>

          <div className="flex items-center gap-md">
            <Avatar
              avatarName="Aragorn"
              avatarUrl="https://static-cdn.jtvnw.net/user-default-pictures-uv/ce57700a-def9-11e9-842d-784f43822e80-profile_image-300x300.png"
              status="ok"
              size="lg"
            />
          </div>

          <div className="flex items-center gap-md">
            <Avatar avatarName="Aragorn" initials="AR" status="ok" size="md" />
            <Avatar avatarName="Aragorn" status="ok" size="md" />
          </div>
        </div>

        <div
          className="ProgressBar text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>ProgressBar</h1>
          <ProgressBar max={100} value={20} />
          <ProgressBar max={100} value={70} labels="floating" />
          <ProgressBar max={100} value={50} labels="inline" />
        </div>

        <div
          className="KarmaBar text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>KarmaBar</h1>
          <KarmaBar
            chaosThreshold={100}
            blessingThreshold={100}
            karmaValue={20}
            size="sm"
          />
          <KarmaBar
            chaosThreshold={100}
            blessingThreshold={100}
            karmaValue={-99}
            labels="floating"
          />
          <KarmaBar
            chaosThreshold={100}
            blessingThreshold={100}
            karmaValue={100}
            labels="inline"
          />
        </div>

        <div
          className="PlayerCard text-2xl font-bold flex flex-col gap-md"
          style={{ margin: "20px 0" }}
        >
          <h1>PlayerCard</h1>
          <PlayerCard
            character={{
              name: "Aragorn",
              class: "Ranger",
              level: 8,
              currentHp: 24,
              maxHp: 30,
              armorClass: 16,
              status: "ok",
              displayAvatar: true,
              displayClass: true,
              displayLevel: true,
              displayHp: true,
              displayArmorClass: true,
              displayStatus: true,
            }}
            layout="vertical"
          />
          <PlayerCard
            character={{
              name: "Aragorn",
              class: "Ranger",
              level: 8,
              currentHp: 24,
              maxHp: 30,
              armorClass: 16,
              status: "ok",
              displayAvatar: true,
              displayClass: true,
              displayLevel: true,
              displayHp: true,
              displayArmorClass: true,
              displayStatus: true,
            }}
            layout="horizontal"
          />
          <PlayerCard
            character={{
              name: "Aragorn",
              class: "Ranger",
              level: 8,
              currentHp: 24,
              maxHp: 30,
              armorClass: 16,
              status: "ok",
              displayAvatar: true,
              displayClass: true,
              displayLevel: true,
              displayHp: true,
              displayArmorClass: true,
              displayStatus: true,
            }}
            layout="minimal"
          />
        </div>
      </main>
    </AuthGate>
  );
}

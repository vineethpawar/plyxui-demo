/**
 * plyxui-demo — a team-chat dashboard built end-to-end with @plyxui/*.
 *
 * Every component on screen comes from a published package:
 *   ThemeProvider + ToastProvider in main.tsx wrap the app
 *   AppShell from @plyxui/layouts gives us the sidebar/header/main slots
 *   Box / Text / Stack / Flex / Input / Button / Image / Divider / Spinner
 *     from @plyxui/primitives do the day-to-day layout work
 *   Tooltip from @plyxui/comps for hover hints
 *   useDisclosure / useMediaQuery / useToast from @plyxui/hooks
 *
 * The cream + peach + yellow palette comes from a brand extension
 * registered in main.tsx via registerColorTokens. Same plyxui, swapped
 * tokens — no fork.
 */
import { useState } from "react";
import { useTheme } from "@plyxui/styles";
import { useMediaQuery, useDisclosure, useToast } from "@plyxui/hooks";
import { AppShell } from "@plyxui/layouts";
import { Box, Text, Stack, Flex, Input, Button, Image, Divider } from "@plyxui/primitives";
import { Tooltip, Drawer } from "@plyxui/comps";
import { NAV, FOOTER_NAV, CHATS, MESSAGES, REMINDERS } from "./data";

const SIDEBAR_WIDTH = 232;

export function App() {
  const { colors } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1100px)");
  const isWide = useMediaQuery("(min-width: 760px)");
  const mobileNav = useDisclosure(false);
  const [activeNav, setActiveNav] = useState("announcements");
  const [activeChat, setActiveChat] = useState("4");

  return (
    <>
      <AppShell
        sidebar={isWide ? <SidebarBlock active={activeNav} onSelect={setActiveNav} /> : undefined}
        sidebarWidth={SIDEBAR_WIDTH}
        divider={false}
        header={<TopBar onMenu={mobileNav.open} showMenu={!isWide} />}
        style={{ background: colors.cream, color: colors.inkStrong }}
      >
        <Box
          style={{
            padding: isWide ? 20 : 12,
            background: colors.cream,
            minHeight: "100%",
            color: colors.inkStrong,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop ? "minmax(280px, 340px) minmax(0, 1fr) minmax(260px, 320px)" : isWide ? "minmax(280px, 340px) minmax(0, 1fr)" : "1fr",
              gap: 16,
              alignItems: "stretch",
              minHeight: "calc(100vh - 88px)",
            }}
          >
            <MessagesColumn active={activeChat} onSelect={setActiveChat} />
            <ChatColumn active={activeChat} />
            {isDesktop && <SchedulerColumn />}
          </div>
        </Box>
      </AppShell>

      <Drawer open={mobileNav.isOpen} onClose={mobileNav.close} side="left" size={264}>
        <SidebarBlock
          active={activeNav}
          onSelect={(k) => {
            setActiveNav(k);
            mobileNav.close();
          }}
        />
      </Drawer>
    </>
  );
}

/* ---------- sidebar ---------- */

function SidebarBlock({ active, onSelect }: { active: string; onSelect: (k: string) => void }) {
  const { colors } = useTheme();
  return (
    <Box
      style={{
        height: "100%",
        padding: 18,
        background: colors.card,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Flex align="center" gap={2} style={{ marginBottom: 6 }}>
        <DotMark />
        <Text size="md" weight="bold" style={{ color: colors.inkStrong, fontFamily: "inherit" }}>
          plyxui
        </Text>
      </Flex>

      <Text
        size="xs"
        weight="semibold"
        style={{
          color: colors.inkSoft,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: 10,
        }}
      >
        Main Menu
      </Text>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map((it) => (
          <NavRow
            key={it.key}
            label={it.label}
            icon={it.icon}
            active={it.key === active}
            onClick={() => onSelect(it.key)}
            badge={it.key === "announcements" ? <AvatarStack count={3} /> : undefined}
          />
        ))}
      </nav>

      <QuickAddCard />

      <div style={{ flex: 1 }} />

      <Divider />

      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {FOOTER_NAV.map((it) => (
          <NavRow key={it.key} label={it.label} icon={it.icon} active={false} onClick={() => {}} muted />
        ))}
      </nav>
    </Box>
  );
}

function NavRow({
  label,
  icon,
  active,
  onClick,
  badge,
  muted,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
  muted?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        background: active ? colors.yellow : "transparent",
        border: "none",
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        color: muted ? colors.inkSoft : colors.inkStrong,
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        transition: "background 0.18s ease",
      }}
    >
      <NavIcon name={icon} active={active} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge}
    </button>
  );
}

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const { colors } = useTheme();
  const color = active ? colors.inkStrong : colors.inkSoft;
  const stroke = 1.8;
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "home":
      return <svg {...common}><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10.5Z"/></svg>;
    case "users":
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "check-circle":
      return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>;
    case "file-text":
      return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8M8 9h2"/></svg>;
    case "bell":
      return <svg {...common}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case "help-circle":
      return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case "log-out":
      return <svg {...common}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

function AvatarStack({ count }: { count: number }) {
  const { colors } = useTheme();
  return (
    <span style={{ display: "inline-flex" }}>
      {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            border: `2px solid ${colors.yellow}`,
            background: ["#F0AA9E", "#9CB4A0", "#C9B98C"][i % 3],
            marginLeft: i === 0 ? 0 : -6,
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

function QuickAddCard() {
  const { colors } = useTheme();
  const { toast } = useToast();
  return (
    <Box
      style={{
        background: colors.cardSubtle,
        borderRadius: 16,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Text size="sm" weight="semibold" style={{ color: colors.inkStrong, fontFamily: "inherit", lineHeight: 1.3 }}>
        Quick Add<br />New Member
      </Text>
      <Button
        variant="primary"
        size="sm"
        onClick={() => toast({ title: "Invite member", description: "Wire this to your invite flow.", variant: "default" })}
        style={{
          background: colors.inkStrong,
          color: colors.cream,
          borderRadius: 999,
          alignSelf: "flex-start",
          padding: "6px 14px",
          height: 30,
          border: "none",
        }}
      >
        + Add Member
      </Button>
    </Box>
  );
}

/* ---------- top bar ---------- */

function TopBar({ onMenu, showMenu }: { onMenu: () => void; showMenu: boolean }) {
  const { colors, mode, toggleTheme } = useTheme();
  return (
    <Flex
      align="center"
      justify="between"
      style={{
        padding: "14px 20px",
        background: colors.cream,
        height: 72,
        gap: 16,
      }}
    >
      <Flex align="center" gap={3} style={{ minWidth: 0 }}>
        {showMenu && (
          <button onClick={onMenu} aria-label="Open navigation" style={{ background: "transparent", border: "none", cursor: "pointer", color: colors.inkStrong, fontSize: 22, lineHeight: 1, padding: 6 }}>≡</button>
        )}
        <div style={{ minWidth: 0 }}>
          <Text size="lg" weight="bold" style={{ color: colors.inkStrong, fontFamily: "inherit" }}>General Chats</Text>
          <Text size="xs" style={{ color: colors.inkSoft, marginTop: 2 }}>20 September 2024</Text>
        </div>
      </Flex>

      <Flex align="center" gap={3} style={{ flex: 1, justifyContent: "flex-end" }}>
        <div style={{ flex: "0 1 360px", minWidth: 0 }}>
          <Input
            placeholder="Search here..."
            leading={<SearchIcon />}
            style={{ background: colors.card, borderRadius: 999, border: "none", height: 40 }}
          />
        </div>
        <Tooltip label="Toggle theme">
          <button onClick={toggleTheme} aria-label="Toggle theme" style={iconBtnStyle(colors)}>
            {mode === "dark" ? "☀" : "☾"}
          </button>
        </Tooltip>
        <button aria-label="Notifications" style={iconBtnStyle(colors)}>
          <BellIcon />
        </button>
        <Flex align="center" gap={2} style={{ paddingLeft: 8 }}>
          <Image
            src="https://i.pravatar.cc/64?img=14"
            alt="You"
            width={36}
            height={36}
            radius="pill"
            fallback={<div style={{ width: "100%", height: "100%", background: colors.peachDeep, color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>MR</div>}
          />
          <div style={{ display: "none" }}>
            <Text size="sm" weight="semibold" style={{ color: colors.inkStrong, fontFamily: "inherit" }}>Mithun Roy</Text>
            <Text size="xs" style={{ color: colors.inkSoft }}>Admin</Text>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

const iconBtnStyle = (colors: ReturnType<typeof useTheme>["colors"]): React.CSSProperties => ({
  background: colors.card,
  border: "none",
  borderRadius: 999,
  width: 40,
  height: 40,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  color: colors.inkStrong,
  fontSize: 16,
});

/* ---------- messages list column ---------- */

function MessagesColumn({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const { colors } = useTheme();
  return (
    <Box style={{ background: colors.card, borderRadius: 20, padding: 18, display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
      <Flex align="center" justify="between">
        <Text size="md" weight="bold" style={{ color: colors.inkStrong, fontFamily: "inherit" }}>Messages</Text>
        <Flex align="center" gap={2}>
          <button aria-label="Filter" style={{ background: colors.cardSubtle, border: "none", borderRadius: 999, width: 30, height: 30, display: "grid", placeItems: "center", cursor: "pointer", color: colors.inkSoft }}>
            <FilterIcon />
          </button>
          <button aria-label="New message" style={{ background: colors.inkStrong, color: colors.cream, border: "none", borderRadius: 999, width: 30, height: 30, fontSize: 16, cursor: "pointer", lineHeight: 1 }}>
            +
          </button>
        </Flex>
      </Flex>

      <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "auto", maxHeight: "calc(100vh - 200px)" }}>
        {CHATS.map((c) => (
          <ChatRow key={c.id} chat={c} active={c.id === active} onClick={() => onSelect(c.id)} />
        ))}
      </div>
    </Box>
  );
}

function ChatRow({ chat, active, onClick }: { chat: typeof CHATS[number]; active: boolean; onClick: () => void }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 10,
        background: active ? colors.cardSubtle : "transparent",
        border: "none",
        borderRadius: 14,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
      }}
    >
      <Image
        src={chat.avatar}
        alt={chat.name}
        width={42}
        height={42}
        radius="pill"
        fallback={<div style={{ width: "100%", height: "100%", background: colors.peachDeep, color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>{chat.name.slice(0, 1)}</div>}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text size="sm" weight="semibold" style={{ color: colors.inkStrong, fontFamily: "inherit", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chat.name}</Text>
        <Text size="xs" style={{ color: colors.inkSoft, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "inherit" }}>{chat.preview}</Text>
      </div>
      {chat.unread ? (
        <span style={{ background: colors.peachDeep, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999 }}>{chat.unread}</span>
      ) : null}
    </button>
  );
}

/* ---------- chat thread column ---------- */

function ChatColumn({ active }: { active: string }) {
  const { colors } = useTheme();
  const chat = CHATS.find((c) => c.id === active) ?? CHATS[0];
  const [draft, setDraft] = useState("");
  const { toast } = useToast();

  return (
    <Box style={{ background: colors.card, borderRadius: 20, padding: 0, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
      <Flex align="center" justify="between" style={{ padding: 18, borderBottom: `1px solid ${colors.cardSubtle}` }}>
        <Flex align="center" gap={3}>
          <Image src={chat.avatar} alt={chat.name} width={42} height={42} radius="pill" />
          <div>
            <Text size="sm" weight="bold" style={{ color: colors.inkStrong, fontFamily: "inherit" }}>{chat.name}</Text>
            <Flex align="center" gap={1} style={{ marginTop: 2 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: "#27A567" }} />
              <Text size="xs" style={{ color: colors.inkSoft, fontFamily: "inherit" }}>Online</Text>
            </Flex>
          </div>
        </Flex>
        <Flex gap={1}>
          <button aria-label="Search" style={iconBtnStyle(colors)}><SearchIcon /></button>
          <button aria-label="More" style={iconBtnStyle(colors)}>⋯</button>
        </Flex>
      </Flex>

      <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 16, overflow: "auto" }}>
        <DateDivider label="23 Sep, 2024" />
        {MESSAGES.map((m) => (
          <Bubble key={m.id} from={m.from} text={m.text} time={m.time} avatar={m.from === "them" ? chat.avatar : undefined} />
        ))}
      </div>

      <Flex align="center" gap={2} style={{ padding: 14, borderTop: `1px solid ${colors.cardSubtle}` }}>
        <Input
          placeholder="Type a message..."
          value={draft}
          onChange={setDraft}
          style={{ background: colors.cardSubtle, borderRadius: 999, border: "none", height: 42, paddingLeft: 18 }}
        />
        <button
          onClick={() => {
            if (!draft.trim()) return;
            setDraft("");
            toast({ title: "Message sent", description: "Wire this up to your transport.", variant: "success" });
          }}
          aria-label="Send"
          style={{ background: colors.inkStrong, color: colors.cream, border: "none", borderRadius: 999, width: 42, height: 42, cursor: "pointer", display: "grid", placeItems: "center" }}
        >
          <SendIcon />
        </button>
      </Flex>
    </Box>
  );
}

function DateDivider({ label }: { label: string }) {
  const { colors } = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, color: colors.inkSoft, fontSize: 11, fontWeight: 600, margin: "8px 0" }}>
      <span style={{ flex: 1, height: 1, background: colors.cardSubtle }} />
      <span>{label}</span>
      <span style={{ flex: 1, height: 1, background: colors.cardSubtle }} />
    </div>
  );
}

function Bubble({ from, text, time, avatar }: { from: "me" | "them"; text: string; time: string; avatar?: string }) {
  const { colors } = useTheme();
  const mine = from === "me";
  return (
    <Flex align="end" gap={2} style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "70%", flexDirection: mine ? "row-reverse" : "row" }}>
      {!mine && avatar ? (
        <Image src={avatar} alt="" width={28} height={28} radius="pill" />
      ) : null}
      <div>
        <div
          style={{
            background: mine ? colors.bubbleMine : colors.bubbleTheirs,
            color: colors.inkStrong,
            padding: "10px 14px",
            borderRadius: 14,
            borderTopLeftRadius: mine ? 14 : 4,
            borderTopRightRadius: mine ? 4 : 14,
            fontSize: 13.5,
            lineHeight: 1.4,
            fontFamily: "inherit",
          }}
        >
          {text}
        </div>
        <div style={{ fontSize: 10, color: colors.inkSoft, marginTop: 4, textAlign: mine ? "right" : "left" }}>{time}</div>
      </div>
    </Flex>
  );
}

/* ---------- scheduler reminder column ---------- */

function SchedulerColumn() {
  const { colors } = useTheme();
  return (
    <Stack direction="vertical" gap={3} style={{ minHeight: 0 }}>
      <Flex align="center" justify="between" style={{ padding: "0 4px" }}>
        <Text size="md" weight="bold" style={{ color: colors.inkStrong, fontFamily: "inherit" }}>Scheduler Reminder</Text>
        <Flex gap={1}>
          <button aria-label="Filter" style={{ background: colors.card, border: "none", borderRadius: 999, width: 32, height: 32, display: "grid", placeItems: "center", cursor: "pointer", color: colors.inkSoft }}>
            <FilterIcon />
          </button>
          <button aria-label="Add" style={{ background: colors.inkStrong, color: colors.cream, border: "none", borderRadius: 999, width: 32, height: 32, fontSize: 16, cursor: "pointer", lineHeight: 1 }}>+</button>
        </Flex>
      </Flex>
      {REMINDERS.map((ev) => (
        <ReminderCard key={ev.id} ev={ev} />
      ))}
    </Stack>
  );
}

function ReminderCard({ ev }: { ev: typeof REMINDERS[number] }) {
  const { colors } = useTheme();
  const bg = ev.variant === "peach" ? colors.peach : colors.yellow;
  return (
    <Box style={{ background: bg, borderRadius: 18, padding: 16, position: "relative", overflow: "hidden", color: colors.inkStrong }}>
      <Text size="xs" weight="semibold" style={{ color: colors.inkStrong, opacity: 0.75, fontFamily: "inherit" }}>{ev.date}</Text>
      <Text size="md" weight="bold" style={{ color: colors.inkStrong, fontFamily: "inherit", marginTop: 4, marginBottom: 6 }}>{ev.title}</Text>
      <Text size="xs" style={{ color: colors.inkStrong, opacity: 0.8, lineHeight: 1.45, fontFamily: "inherit" }}>{ev.body}</Text>
      <Doodle variant={ev.variant} />
    </Box>
  );
}

function Doodle({ variant }: { variant: "peach" | "yellow" }) {
  // tiny decorative SVG so the cards have visual interest without a real illustration asset
  const dark = variant === "peach" ? "#B5685D" : "#9B833A";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ position: "absolute", right: 12, top: 12, opacity: 0.5 }}>
      <circle cx="14" cy="14" r="6" stroke={dark} strokeWidth="2" />
      <path d="M22 28 L36 28 L36 42 L22 42 Z" stroke={dark} strokeWidth="2" />
      <path d="M6 36 L18 36" stroke={dark} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- assorted icons ---------- */

function DotMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      {[4, 12, 20].flatMap((cy) =>
        [4, 12, 20].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill={cx === 12 && cy === 12 ? "#FF5C00" : "currentColor"} />
        )),
      )}
    </svg>
  );
}

function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
}
function BellIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
}
function FilterIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
}
function SendIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>;
}

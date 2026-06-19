// Fake data for the demo. Replace with whatever fetch lives in your app.
export const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "home" },
  { key: "members", label: "Members", icon: "users" },
  { key: "attendance", label: "Attendance", icon: "check-circle" },
  { key: "reports", label: "Reports", icon: "file-text" },
  { key: "announcements", label: "Announcements", icon: "bell" },
];

export const FOOTER_NAV = [
  { key: "help", label: "Help Center", icon: "help-circle" },
  { key: "settings", label: "Settings", icon: "settings" },
  { key: "signout", label: "Sign Out", icon: "log-out" },
];

export interface ChatPreview {
  id: string;
  name: string;
  preview: string;
  avatar: string;
  unread?: number;
  active?: boolean;
}

export const CHATS: ChatPreview[] = [
  { id: "1", name: "Express Yourself", preview: "Strategy session at 3 pm tomorrow?", avatar: "https://i.pravatar.cc/72?img=49" },
  { id: "2", name: "Shaney Patel",      preview: "Sharing the brief for review.",       avatar: "https://i.pravatar.cc/72?img=48", unread: 2 },
  { id: "3", name: "Jamie Marwell",     preview: "Onboarding deck — v2 ready.",         avatar: "https://i.pravatar.cc/72?img=12" },
  { id: "4", name: "Mithun Grives",     preview: "Yeah, the colors look great now.",    avatar: "https://i.pravatar.cc/72?img=14", active: true },
  { id: "5", name: "Tomas Ramirez",     preview: "Pushed the migration script.",        avatar: "https://i.pravatar.cc/72?img=15" },
  { id: "6", name: "Dewa Berry",        preview: "Quick call before standup?",          avatar: "https://i.pravatar.cc/72?img=16" },
  { id: "7", name: "Logan Jin",         preview: "Approved — ship it.",                 avatar: "https://i.pravatar.cc/72?img=17", unread: 1 },
  { id: "8", name: "Katelyn Dudley",    preview: "Notes from the design crit attached.", avatar: "https://i.pravatar.cc/72?img=20" },
  { id: "9", name: "Gabriel Heinen",    preview: "Bug repro on staging.",                avatar: "https://i.pravatar.cc/72?img=33" },
  { id: "10", name: "Edwards Rich",     preview: "Thanks for the writeup!",              avatar: "https://i.pravatar.cc/72?img=11" },
];

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export const MESSAGES: ChatMessage[] = [
  { id: "m1", from: "them", text: "Hey, I had a few notes on the dashboard pass — got a sec?", time: "11:04" },
  { id: "m2", from: "me",   text: "Sure — sending screenshots in a min.", time: "11:06" },
  { id: "m3", from: "them", text: "Loving the cream + peach combo. The chat bubbles especially.", time: "11:07" },
  { id: "m4", from: "me",   text: "All from one token table. Theme toggle and everything stays in step.", time: "11:08" },
  { id: "m5", from: "them", text: "Yeah, the colors look great now. Ship it whenever you're ready.", time: "11:09" },
];

export interface ReminderEvent {
  id: string;
  date: string;
  title: string;
  body: string;
  variant: "peach" | "yellow";
}

export const REMINDERS: ReminderEvent[] = [
  {
    id: "r1",
    date: "27 Sep, 2024",
    title: "Annual Book Fair",
    body: "Open to all members. Volunteer slots still available.",
    variant: "peach",
  },
  {
    id: "r2",
    date: "02 Oct, 2024",
    title: "Art Competition",
    body: "Submissions close at 6 pm. Theme: cities at night.",
    variant: "yellow",
  },
  {
    id: "r3",
    date: "11 Oct, 2024",
    title: "Quarterly Town Hall",
    body: "Numbers, what shipped, what's next. Hybrid.",
    variant: "peach",
  },
];

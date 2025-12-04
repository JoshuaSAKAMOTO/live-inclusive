import { Event } from "@/types";

export const event: Event = {
  title: "逗子ライブインクルーシブ 2026",
  date: "2026-03-22",
  doorTime: "14:30",
  startTime: "15:00",
  venue: "逗子文化プラザ なぎさホール",
  address: "神奈川県逗子市逗子4-2-10",
  capacity: 555,
  prices: [
    { label: "一般", price: 5500 },
    { label: "高校生以下", price: 3000 },
    { label: "障がい者", price: 3000, note: "付添1名無料" },
    { label: "未就学児", price: 0, note: "膝上無料" },
  ],
  ticketUrl: undefined,
};

import Link from "next/link";

export function TicketAnnouncement() {
  return (
    <Link
      href="/tickets"
      className="fixed bottom-6 right-6 z-50 bg-primary text-black font-medium px-6 py-3 shadow-lg hover:opacity-90 transition-opacity"
    >
      チケットを購入する
    </Link>
  );
}

import { MOCK_USER } from "./mockData";

export function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  })
    .format(amount)
    .replace("KES", "Ksh");
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function generateInviteLink(chamaId: string, userId: string): string {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://chamaconnect.io";
  const params = new URLSearchParams({ ref: userId, chama: chamaId });
  return `${base}/invite?${params.toString()}`;
}


export async function generateQRCode(text: string): Promise<string> {
  try {
    const QRCode = require("qrcode");
    return await QRCode.toDataURL(text, {
      width: 280,
      margin: 2,
      color: { dark: "#0a0a0a", light: "#ffffff" },
      errorCorrectionLevel: "M",
    });
  } catch {
    const encoded = encodeURIComponent(text.slice(0, 40));
    return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'><rect width='280' height='280' fill='%23fff'/><text x='140' y='130' text-anchor='middle' font-size='12' fill='%23333'>QR Code</text><text x='140' y='155' text-anchor='middle' font-size='9' fill='%23666'>${encoded}</text></svg>`;
  }
}

export function getCurrentUserId(): string {
  return MOCK_USER.id;
}

export function isValidPhone(phone: string): boolean {
  return /^\+254[17]\d{8}$/.test(phone);
}

export function isValidPaybill(paybill: string): boolean {
  return /^\d{5,6}$/.test(paybill);
}

export function truncate(str: string, max: number): string {
  return str.length <= max ? str : `${str.slice(0, max)}…`;
}

export function relativeDate(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return new Date(dateStr).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
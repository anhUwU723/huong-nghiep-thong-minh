import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatVND(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "Đang cập nhật";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "Đang cập nhật";
  const trieu = num / 1_000_000;
  if (trieu >= 1000) {
    return `${(trieu / 1000).toFixed(1)} tỷ`;
  }
  if (Number.isInteger(trieu)) return `${trieu} triệu`;
  return `${trieu.toFixed(1)} triệu`;
}
